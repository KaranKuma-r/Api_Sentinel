const mongoose = require("mongoose");
// const agent
const metricsEventSchema = new mongoose.Schema({
    agentKey: {
      type: String,
      required: true,
      index: true
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

metricsEventSchema.index({agentKey:1, createdAt: -1 });
metricsEventSchema.index({ agentKey: 1, endpoint: 1 })



module.exports= mongoose.model("MetricsEvent",metricsEventSchema)