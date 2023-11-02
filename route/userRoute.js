const express = require("express");

const  bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")

const UserModel = require("../model/userModel");

const userRouter = express.Router()

userRouter.post("/register", async (req,res) =>{
    try {
        
        const { Username,
            Avatar,
            Email,
            Password} = req.body

           const user = await UserModel.findOne({Email});

           if(user){
            res.status(400).json({msg:"Already have an account please login!!"})
           }

           
            bcrypt.hash(Password, 5, async (err, hash)=>{
                if(hash){
                    const NewUser = new UserModel({Username, Avatar, Email, Password:hash})

                    await NewUser.save();

                    res.status(200).json({msg:"New user Resister succesfully!!"})
                }
                else{
                    res.status(400).json({msg:"wrong password"});
                }
            })
           

    } catch (error) {
        res.status(400).json({msg:error.msg})
    }
})

userRouter.post("/login", async(req, res) =>{

    try {
        const {Email, Password} = req.body

        const user = await UserModel.findOne({Email});

        if(user){
           
         bcrypt.compare(Password, user.Password, function(err, result) {

            if(result){
                const token = jwt.sign({UserID: user._id, UserName: user.Username}, 'nil');

                res.status(200).json({msg: "Login succefully", token:token});
            }else{
                res.status(400).json({msg:"wrong password"})
            }
        })
    }else{
        res.status(400).json({msg:"create acc first"})
    }
 } catch (error) {
        res.status(400).json({msg:error.msg})
    }
})

module.exports = userRouter;