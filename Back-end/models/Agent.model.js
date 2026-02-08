const  mongoose  = require("mongoose");

const agentSchema =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    agentKey:{
        type:String,
        umique:true,
        required:true
    }
}, { timestamps: true });

module.exports=mongoose.model("Agent",agentSchema)