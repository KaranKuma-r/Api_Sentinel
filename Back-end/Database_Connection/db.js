const  mongoose = require("mongoose")

const connectDB = async()=>{

    try{
       
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connect")

    }catch(error){
        console.log("DB Connection Failed :", error.message)
    }

}

module.exports=connectDB