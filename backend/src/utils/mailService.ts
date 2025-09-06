import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export const sendMail = async (to: string, message: string) => {

    const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: to,
        subject: "Verification Code",
        text: message, // plain‑text body
    });
    console.log("Message Info : ", info.messageId);

}
