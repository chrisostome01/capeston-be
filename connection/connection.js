import dotEnv from 'dotenv';
dotEnv.config();
import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTIONSTRING , {useNewUrlParser: true , useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console , 'connection error') );
db.once('open' , function() {
    console.log('Connected');
})
//models
import Users from '../../models/models-babel/Users'