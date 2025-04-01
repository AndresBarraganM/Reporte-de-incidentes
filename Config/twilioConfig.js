//se requiere nmpm install twilio
import twilio from 'twilio';

const accountSid = 'AC1cee082ec357d40ab03c5c59464a0e2d'; 
const authToken = '9be9a420d23580986360f5354d44ca6c';   
const twilioPhoneNumber = '+17753620833';               

const client = new twilio(accountSid, authToken);

export { client, twilioPhoneNumber }; 
