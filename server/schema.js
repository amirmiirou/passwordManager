const mongoose=require("mongoose")
const schema=mongoose.Schema
const sc=new schema({


name : String, 
iv : String ,
password : String






})



const model=mongoose.model("users",sc)

module.exports=model
