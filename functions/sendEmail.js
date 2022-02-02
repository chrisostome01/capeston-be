
import nodemailer  from 'nodemailer';
import dotEnv from 'dotenv';
import { success , sendError } from './response';
dotEnv.config();
const sendEmail = async (req , res) => {
  if(req.subscribers.length == 0 ) return ;

  var receiver = [];
  for(let i = 0 ; i < req.subscribers.length; i++ ){
    // req.subscribers[i];
    receiver.push( req.subscribers[i].Email);
  }
 
    
  try{
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
      to: receiver, 
      subject: "Hello ✔ please checkout this blog", 
      text: "Hello world?", 
      html: `
          <h1>${req.NewBlog.Title}</h1>
          <a href="http://127.0.0.1:3500/api/v1/blog/find?blogId=${req.NewBlog._id}" >Read more</a>
          <br><br>
          <a href="https://capstonetyu.herokuapp.com/api/v1/blog/find?blogId=${req.NewBlog._id}" >Read more</a>
      `, 
    });
    
    success(res,201,req.NewBlog,'Created');
    return;
  }
  catch(error){
      let message = error.message;
      sendError(res,500,null,message);
  }
    
  
  }
  
  export default sendEmail ;