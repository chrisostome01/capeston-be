
import nodemailer  from 'nodemailer';
import dotEnv from 'dotenv';
dotEnv.config();
const sendEmail = async (toEmail) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "codeinblog123@gmail.com", 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });
    let info = await transporter.sendMail({
      from: 'Sezerano J Chrysostome 👻" <codeinblog@gmail.com>', 
      to: toEmail, 
      subject: "Hello ✔ please checkout this blog", 
      text: "Hello world?", 
      html: "<b>Hello world?</b>", 
    });
  
    // console.log("Message sent: %s", info.messageId);
  
  }
  
  export default sendEmail ;