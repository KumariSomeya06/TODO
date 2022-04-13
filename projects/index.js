import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app=express();
const PORT =3000;

app.use(bodyParser.json());


//routes import
import todoRoutes from './routes/todo.js';

//route middleware
app.use('/todo',todoRoutes)





//connection to mongodb
try {
  await mongoose.connect("mongodb://localhost:27017/todo",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
console.log("connected");
} catch (error) {
  console.log(error);
}


app.listen(PORT,()=>console.log(`Server: http://localhost:${PORT}`))





