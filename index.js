import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../routes/routes-babel/userRoutes.js';
import blogRoute  from '../routes/routes-babel/blogRoute.js';
const app = express();
const PORT = process.env.PORT || 3500;
 

/* ===== Start:: user routes ========== */ 
   app.use('/api/v1/user', userRoutes);
/* ===== End:: user routes ============ */ 

/* ===== Start:: blog routes ========== */ 
   app.use('/api/v1/blog',  blogRoute);
/* ===== End:: blog routes ============ */ 

app.listen(PORT , () => console.log(`Server running on port ${PORT}`));