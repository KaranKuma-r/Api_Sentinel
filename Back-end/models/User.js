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
    lastAIUsage: {
        type: Date,
        default: null
    }
    

},{timestamps:true} 
)

module.exports=mongoose.model("User",userSchema)