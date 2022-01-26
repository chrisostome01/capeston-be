import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import blogRoute  from './routes/blogRoute.js';
import contactUs  from './routes/contactUsRoute.js';
import commentRoute  from './routes/commentRoute.js';
const app = express();
const PORT = process.env.PORT || 3500;
 

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

app.listen(PORT , () => console.log(`Server running on port ${PORT}`));


export const serverExport = () =>{
   return  app ;
}

