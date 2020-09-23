/*
Copyright (C): 2010-2020, Shenzhen Yahboom Tech
modified from wujianzhang
load dependency
"Asr": "file:../pxt-GestureRecognition"
*/

//% color="#3CB371" weight=20 icon="\uf259"
namespace GestureRecognition{
    
    let Init_Register_Array = [   
        [0xEF,0x00],
        [0x37,0x07],
        [0x38,0x17],
        [0x39,0x06],
        [0x41,0x00],
        [0x42,0x00],
        [0x46,0x2D],
        [0x47,0x0F],
        [0x48,0x3C],
        [0x49,0x00],
        [0x4A,0x1E],
        [0x4C,0x20],
        [0x51,0x10],
        [0x5E,0x10],
        [0x60,0x27],
        [0x80,0x42],
        [0x81,0x44],
        [0x82,0x04],
        [0x8B,0x01],
        [0x90,0x06],
        [0x95,0x0A],
        [0x96,0x0C],
        [0x97,0x05],
        [0x9A,0x14],
        [0x9C,0x3F],
        [0xA5,0x19],
        [0xCC,0x19],
        [0xCD,0x0B],
        [0xCE,0x13],
        [0xCF,0x64],
        [0xD0,0x21],
        [0xEF,0x01],
        [0x02,0x0F],
        [0x03,0x10],
        [0x04,0x02],
        [0x25,0x01],
        [0x27,0x39],
        [0x28,0x7F],
        [0x29,0x08],
        [0x3E,0xFF],
        [0x5E,0x3D],
        [0x65,0x96],
        [0x67,0x97],
        [0x69,0xCD],
        [0x6A,0x01],
        [0x6D,0x2C],
        [0x6E,0x01],
        [0x72,0x01],
        [0x73,0x35],
        [0x74,0x00],
        [0x77,0x01]]

    let Init_PS_Array = [   
        [0xEF,0x00],
        [0x41,0x00],
        [0x42,0x00],
        [0x48,0x3C],
        [0x49,0x00],
        [0x51,0x13],
        [0x83,0x20],
        [0x84,0x20],
        [0x85,0x00],
        [0x86,0x10],
        [0x87,0x00],
        [0x88,0x05],
        [0x89,0x18],
        [0x8A,0x10],
        [0x9f,0xf8],
        [0x69,0x96],
        [0x6A,0x02],
        [0xEF,0x01],
        [0x01,0x1E],
        [0x02,0x0F],
        [0x03,0x10],
        [0x04,0x02],
        [0x41,0x50],
        [0x43,0x34],
        [0x65,0xCE],
        [0x66,0x0B],
        [0x67,0xCE],
        [0x68,0x0B],
        [0x69,0xE9],
        [0x6A,0x05],
        [0x6B,0x50],
        [0x6C,0xC3],
        [0x6D,0x50],
        [0x6E,0xC3],
        [0x74,0x05]]

    let Init_Gesture_Array = [   
        [0xEF,0x00],
        [0x41,0x00],
        [0x42,0x00],
        [0xEF,0x00],
        [0x48,0x3C],
        [0x49,0x00],
        [0x51,0x10],
        [0x83,0x20],
        [0x9F,0xF9],
        [0xEF,0x01],
        [0x01,0x1E],
        [0x02,0x0F],
        [0x03,0x10],
        [0x04,0x02],
        [0x41,0x40],
        [0x43,0x30],
        [0x65,0x96],
        [0x66,0x00],
        [0x67,0x97],
        [0x68,0x01],
        [0x69,0xCD],
        [0x6A,0x01],
        [0x6B,0xB0],
        [0x6C,0x04],
        [0x6D,0x2C],
        [0x6E,0x01],
        [0x74,0x00],
        [0xEF,0x00],
        [0x41,0xFF],
        [0x42,0x01]]

    const PAJ7620_ID = 0x73                   //手势识别模块地址
    const PAJ7620_REGITER_BANK_SEL = 0xEF     //寄存器库选择

    const PAJ7620_BANK0 = 0
    const PAJ7620_BANK1 = 1

    const GES_RIGHT_FLAG = 1
    const GES_LEFT_FLAG = 2   
    const GES_UP_FLAG = 4
    const GES_DOWN_FLAG = 8 
    const GES_FORWARD_FLAG = 16
    const GES_BACKWARD_FLAG = 32   
    const GES_CLOCKWISE_FLAG = 64
    const GES_COUNT_CLOCKWISE_FLAG = 128 
    const GES_WAVE_FLAG = 1

    

    export enum Gesture_state{
        //% blockId="right" block="right"
        right = 1,
        //% blockId="left" block="left"  
        left = 2,
        //% blockId="up" block="up"        
        up = 4,
        //% blockId="down" block="down"        
        down = 8,
        //% blockId="wave" block="wave"        
        wave = 11,
        //% blockId="forward" block="forward"        
        forward = 16,
        //% blockId="backward" block="backward"        
        backward = 32,
        //% blockId="clockwise" block="clockwise"        
        clockwise = 64,
        //% blockId="count_clockwise" block="count_clockwise"        
        count_clockwise = 128
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

        /*GestureSelectBank(0);
        GestureSelectBank(0);
        if((GestureReadReg(0) != 0x20)||(GestureReadReg(1)!=0x76))
        {
            return 0xff;
            
        }*/
        if(GestureReadReg(0) != 0x20)
        {
            return 0xff;
            
        }


        for(let i = 0;i < Init_Register_Array.length;i++)
        {
            GestureWriteReg(Init_Register_Array[i][0],Init_Register_Array[i][1]);

        }
        GestureSelectBank(0);

        for(let i = 0;i < Init_Gesture_Array.length;i++)
        {
            GestureWriteReg(Init_Gesture_Array[i][0],Init_Gesture_Array[i][1]);

        }

        return 0;
        
    }

    //% blockId="GetGesture" block="GetGesture"
    export function GetGesture(): number {
        
        let date = GestureReadReg(0x43);

        switch(date)
        {
            case GES_RIGHT_FLAG:
            case GES_LEFT_FLAG:
            case GES_UP_FLAG:
            case GES_DOWN_FLAG: 
            case GES_FORWARD_FLAG:
            case GES_BACKWARD_FLAG:
            case GES_CLOCKWISE_FLAG:
            case GES_COUNT_CLOCKWISE_FLAG: 
                break;

            default:
                date = GestureReadReg(0x44);
                if(date == GES_WAVE_FLAG)
                {
                    return 11;
                }
                break;

        }

        return date;
    }

    //% blockId="CheckGesture" block="CheckGesture is %state"
    export function CheckGesture(state:Gesture_state): number {
        
        if(GetGesture() == state)
        {
            return 0;
        }
        else
        {
            return 0xff;
        }

    }

}
