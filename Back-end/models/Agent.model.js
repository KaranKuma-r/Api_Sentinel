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
        unique:true,
        required:true
    }
}, { timestamps: true });

agentSchema.index(
  { userId: 1, serviceName: 1 },
  { unique: true }
);


module.exports=mongoose.model("Agent",agentSchema)