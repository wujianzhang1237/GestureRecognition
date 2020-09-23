/*
Copyright (C): 2010-2020, Shenzhen Yahboom Tech
modified from wujianzhang
load dependency
"Asr": "file:../pxt-GestureRecognition"
*/

//% color="#006400" weight=20 icon="\uf130"
namespace GR{
    
    let initRegisterArray= [   
        [0xEF,0x00],
        [0x32,0x29],
        [0x33,0x01],
        [0x34,0x00]]

    const PAJ7620_ID = 0x73                   //手势识别模块地址
    const PAJ7620_REGITER_BANK_SEL = 0xEF     //寄存器库选择

    const PAJ7620_BANK0 = 0
    const PAJ7620_BANK1 = 1

    enum bank_e {
        BANK0 = 0, 
        BANK1 = 1
    }


    function GestureWriteReg(addr:number,cmd:number){
        
        let buf = pins.createBuffer(2);
        buf[0] = addr;
        buf[1] = cmd;
        pins.i2cWriteBuffer(PAJ7620_ID, buf);
    }

    function GestureReadReg(addr:number):number {
        
        let buf = pins.createBuffer(1);
        buf[0] = addr;
        pins.i2cWriteBuffer(PAJ7620_ID, buf);
        
        let result = pins.i2cReadNumber(PAJ7620_ID,NumberFormat.UInt8LE, false);
        return result;
    }




    function GestureSelectBank(bank:number):void{
        switch(bank)
        {
            case 0:
                GestureWriteReg(PAJ7620_REGITER_BANK_SEL,PAJ7620_BANK0);
                break;
            case 1:
                GestureWriteReg(PAJ7620_REGITER_BANK_SEL,PAJ7620_BANK1);
                break;               
            default:
                break;
        }

    }

    //% blockId="GestureInit" block="GestureInit"
    export function GestureInit(): number {
        basic.pause(800);//等待芯片稳定
        GestureSelectBank(0);
        GestureSelectBank(0);
        if((GestureReadReg(0) != 0x20)||(GestureReadReg(1)!=0x76))
        {
            return 0xff;
            
        }
        for(let i = 0;i < initRegisterArray.length;i++)
        {
            GestureWriteReg(initRegisterArray[i][0],initRegisterArray[i][1]);

        }

        GestureSelectBank(0);
        return 0;
        
    }
    //% blockId="GetGesture" block="GetGesture"
    export function GetGesture(): number {
        
        return GestureReadReg(0x43);
    }

 
 
}
