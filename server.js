import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3500;
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req , res) => {   
  res.json({"msg" : "Helloworld 123"});  
});
app.get('/api/v1/users',(req , res) => {   
  res.json([1,2,3,4]);  
});

app.listen(PORT , () => console.log(`Server running on port ${PORT}`));