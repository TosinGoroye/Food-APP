import { accountSid, authToken, fromAdminPhone , gmail, gmailPass, adminMail } from '../config/index'
import nodemailer from 'nodemailer'


export const GenerateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000)

    const expiry = new Date();

    expiry.setTime(new Date().getTime()) +(30 * 60 * 1000)

    return { otp, expiry }
}


export const onRequestOTP = async(otp:number, toPhoneNumber:string) => {
    const client = require('twilio')(accountSid, authToken); 

   const response = await client.messages 
      .create({ 
         body: `Your OTP is ${otp}`,      
         to: toPhoneNumber,
         from: fromAdminPhone
       }) 
    return response
}


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmail, // generated ethereal user
        pass: gmailPass, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
})


// send mail with defined transport object
export const sendMail = async (
    from:string,             // sender address
    to:string,              // list of receivers
    subject:string,        // Subject line
    text:string,          // plain text body
    html:string,         // html body
  ) => {
    try {
        await transport.sendMail({
            // from:

        })
         
        
    } catch (error) {
        console.log(error)
        
    }

  };




// GenerateOTP()