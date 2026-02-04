const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
    },
    password:{
        type:String,
        require:true,
    },
    

},{timestamps:true} 
)

module.exports=mongoose.model("User",userSchema)