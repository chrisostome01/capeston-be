
import nodemailer  from 'nodemailer';
import dotEnv from 'dotenv';
dotEnv.config();
const sendEmail = async (req , res) => {
  if(req.subscribers.length == 0 ) return ;

  var receiver = '';
  for(let i = 0 ; i <= req.subscribers.length; i++ ){
    receiver += `${req.subscribers[1].Email}`;
    if( i != (req.subscribers.length - 1) ){
      receiver += ', ';
    }
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
          <h1>${req.NewBlog.Title}</h1><br><br>
          <a href="http://127.0.0.1:3500/api/v1/blog/find?blogId=${req.NewBlog._id}" >Read more</a>
          <br><br>
          <a href="https://capstonetyu.herokuapp.com/api/v1/blog/find?blogId=${req.NewBlog._id}" ></a>
      `, 
    });
    return res.status(200).json({"data" : req.NewBlog  });
  }
  catch(error){
    res.status(500).json({"error" : error.message})
  }
    
  
  }
  
  export default sendEmail ;