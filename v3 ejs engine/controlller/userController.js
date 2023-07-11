const userModel = require('../models/userModel');
const user = require('../models/userModel');

const bcrypt = require('bcrypt');


const securePass = async(password)=>{
    const spass = await bcrypt.hash(password,10);
    return spass;
}

const loadRegister = async(req,res)=>{
    try {
     res.render('index');

        
    } catch (error) {
        console.log(error.message);
        
    }
}
const loadsecond = async(req,res)=>{
    try {
     const {name,usn,section} = await user.findById({_id:req.session.user_id});
     res.render('secondpage_admin',{name,usn,section});
// comment
        
    } catch (error) {
        console.log(error.message);
        
    }
}
const insertUser = async(req,res)=>{
    try {
        const spass = await securePass(req.body.pass);
        const User =  new user({
            name:req.body.name,
            email:req.body.email,
            section:req.body.section,
            usn:req.body.usn,
            isAdmin:true //amshu change this when you add admin functionality , always true
            pass:spass
        }
       
        );
        const checkUser = await userModel.findOne({email:User.email});
        if(checkUser)res.render('index',{message:"User already exists! Please login to continue"});
        else{
         const userData= await User.save();
        if(userData){
            res.render('secondpage_admin',{name:User.name,usn:User.usn,section:User.section});
        }
    } 
    } catch (error) {
        console.log(error.message)
        
    }
}
const verifyLogin = async(req,res)=>{
    try {
        const email = req.body.email;
        const pass = req.body.pass;
        const UserData = await userModel.findOne({email:email});
        if(UserData){

           const match =  await bcrypt.compare(pass,UserData.pass);
            if(match){
                req.session.user_id= UserData._id;
                res.redirect('secondpage_admin');
                // res.render('secondpage_admin',{name:UserData.name,usn:UserData.usn,section:UserData.section});
            }
            else {
                res.render('index',{message:"password or email is incorrect"});
            }
       }
        else {
            res.render('index',{message:"user not found , please sign up"});
        }
    } catch (error) {
        console.log(error);
        
    }
}
const logout = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('index');
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = {loadRegister,insertUser,verifyLogin,loadsecond,logout};