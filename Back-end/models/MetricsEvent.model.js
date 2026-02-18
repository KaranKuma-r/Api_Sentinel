const mongoose = require("mongoose");

const metricsEventSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    endpoint:{
        type:String,
        required:true,
    },
    method:{
        type:String,
        required:true
    },
    statusCode:{
        type:Number,
        required:true
    },
    responseTimeMs:{
        type:Number,
        required:true
    },
    error:{
        type:Boolean,
        default:false
    }
},{ timestamps: true })

metricsEventSchema.index({ userId: 1, serviceName: 1, createdAt: -1 });


module.exports= mongoose.model("MetricsEvent",metricsEventSchema)