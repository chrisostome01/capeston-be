import dotEnv from 'dotenv';
dotEnv.config();
import mongoose from 'mongoose';


const databaseConnection = () =>{
    try {
        mongoose.connect(process.env.CONNECTIONSTRING , {useNewUrlParser: true , useUnifiedTopology: true });
    } catch (error) {
        console.log('Database can not be connected' , error.message);
    }
}

databaseConnection();

const db = mongoose.connection;
db.on('error', console.error.bind(console , 'connection error') );
db.once('open' , function() {
    // console.log('Connected');
})
//models
import Users from '../models/Users'