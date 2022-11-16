import { Request, Response } from 'express';
import { registerSchema, option, GeneralSalt, GeneratePassword, GenerateOTP, onRequestOTP } from '../utils';  
import { UserInstance } from '../model/userModel'
import { v4 as uuidv4 } from 'uuid'


export const Register = async (req: Request, res:Response)=> {
    try {
        const { email, phone, password, confirm_password } = req.body
        const uuiduser = uuidv4()

        const validateResult = registerSchema.validate(req.body,option)
        if(validateResult.error){
            // console.log(validateResult.error.details)

            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }


        // Generate salt
        const salt = await GeneralSalt();
        const userPassword = await GeneratePassword(password, salt)



        //GenerateOTP
        const { otp, expiry } = GenerateOTP();


        // check if the users exist
        const User = await UserInstance.findOne({
           where:{ email:email } })

        
        // Create User
        if(!User){
            let user = await UserInstance.create({
                id:uuiduser,
                email,
                password:userPassword,
                firstName: "",
                lastName: "",
                salt,
                address: "",
                phone,
                otp,
                otp_expiry: expiry,
                lng: 0,
                lat: 0,
                verified: false,
            })


            // send otp to user
            await onRequestOTP(otp, phone)

            return res.status(201).json({
                message:"User Created successfully",
                user
            })
        }
        return res.status(400).json({
            message:"User already exist", 
        })
    } catch (error) {
        res.status(500).json({
            Error:"Internal server Error",
            route:"/users/signup"
        })
    }
}


