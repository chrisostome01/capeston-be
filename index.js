import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import blogRoute  from './routes/blogRoute.js';
import contactUs  from './routes/contactUsRoute.js';
import commentRoute  from './routes/commentRoute.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import sendEmail from './functions/sendEmail.js';


const app = express();
const PORT = process.env.PORT || 3500;
 

/* ================ Start:: SwaggerSetup ========================  */
const options = {
   definition:{
       openapi: "3.0.0",
       info:{
           title: "Capstone",
           version: "1.0.1"
       },
       servers:[{
         surl: `http://localhost:${PORT}`,
         url: `https://capstonetyu.herokuapp.com/`
       }],      
   },
   apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);
app.use("/api-doc",swaggerUI.serve ,swaggerUI.setup(specs));
/* ================ End:: SwaggerSetUp ==========================  */


/* ===== Start:: user routes ========== */ 
   app.use('/api/v1/user', userRoutes);
/* ===== End:: user routes ============ */ 

/* ===== Start:: blog routes ========== */ 
   app.use('/api/v1/blog',  blogRoute);
/* ===== End:: blog routes ============ */ 

/* ===== Start:: blog routes ========== */ 
   app.use('/api/v1/contact', contactUs);
/* ===== End:: blog routes ============ */ 

/* ===== Start:: comment routes ========== */ 
   app.use('/api/v1/comment', commentRoute);
/* ===== End:: comment routes ============ */ 


// sendEmail('sezeranochrisostom123@gmail.com');
app.listen(PORT , () => console.log(`Server running on port ${PORT}`));


export const serverExport = () =>{
   return  app ;
}

