const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);


//  User Register 
const register = async (req,res)=>{
    const {name,email,password} = req.body;

    // If User already exists in database
    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({message:"User already exists"})

    // Hashed The password

    const hashedPassword = await bcrypt.hash(password,saltRounds);
    console.log(password,hashedPassword)

    // Register a new user

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    
  res.status(200).json({message:"User register Successfully"})
}

// User Login

const login =async(req,res)=>{

    const {email,password} = req.body;

    const user = await User.findOne({email})
    if(!user)  return res.status(400).json({ message: "Invalid credentials" });

    const match =await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})


    res.status(200).json({message:"Login Successfully",token})

}
module.exports={register,login}