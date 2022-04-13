const express = require("express");
const mongoose = require('mongoose')

const app = express();

//connection to mongodb
mongoose.connect("mongodb://localhost/todo_db",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    

});


//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

//routes

app.use(require("./routes/index"))


//config
app.listen(3000,()=>console.log("start server"));