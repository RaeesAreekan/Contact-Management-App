const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { has } = require('lodash')
const { use } = require('react')

const registerUser = asyncHandler(async(req,res)=>{
    const {user,email,password} = req.body
    if(!user || !email || !password){
        res.status(404)
        throw new Error(" All fields are mandatory !!")
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const userN = await User.create({
    user,
    email,
    password:hashedPassword
  }) 
  console.log(`User created : ${user}`)
  if (userN) {
    res.status(201).json({ _id: userN.id, email: userN.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }


})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
      }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign(
            {
                user:{
                    user:user.user,
                    email:user.email,
                    id:user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECERT,
            {expiresIn:"10m"}
        )
        res.json(accesstoken)
    }
    else{
        res.status(401)
        throw new Error("email or password is not valid")
    }

})

const currentUser = asyncHandler(async(req,res)=>{
    res.json({message:"Current User"})
})

module.exports = {registerUser,loginUser,currentUser}