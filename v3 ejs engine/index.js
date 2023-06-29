const mongoose = require('mongoose');
const path = require('path')
mongoose.connect("mongodb+srv://amshucs21:amshuamshu@webdev.kcky73w.mongodb.net/webdev?retryWrites=true&w=majority");

const express = require('express')
const app = express();
app.use(express.static(path.join(__dirname,'./view/styles')));
const userRoute= require('./routes/userRoutes');
app.set('view engine','ejs');
app.set('view','./view')
app.use('/',userRoute);

app.listen(3000,()=>{
    console.log("the app is running in http://localhost:3000/index")
});
