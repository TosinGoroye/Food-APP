import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()



export const db = new Sequelize('app', '', '',{
    storage: "./food.sqlite",
    dialect: "sqlite",
    logging: false
})



export const accountSid = process.env.ACCOUNTSID;
export const authToken = process.env.AUTHTOKEN;
export const fromAdminPhone = process.env.fromAdminPhone
export const gmail = process.env.gmail
export const gmailPass = process.env.gmailPass
export const adminMail = process.env.adminMail

