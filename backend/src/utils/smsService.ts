import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

export const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
export const twilioAuthToken = process.env.TWILIO_AUTHTOKEN as string;
export const twilio_no = process.env.TWILIO_NUMBER as string;

const client = twilio(accountSid, twilioAuthToken);

export const createMessage = async (messageContent: string, to: string) => {
    console.log({accountSid, twilioAuthToken});
    const message = await client.messages.create({
        body: messageContent,
        from : twilio_no,
        to: to,
    });
    console.log({message});
}