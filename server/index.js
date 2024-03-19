const http=require("http")
const express=require("express")
const mysql=require("mysql")
const mongoose=require("mongoose")
const model=require("./schema")
const cors=require("cors")
const app=express()
const {encrypt,decrypt}=require("./password")
const server=http.createServer(app)
app.use(cors({origin : "https://password-manager-client-one.vercel.app"}))
app.use(express.json())

//const con=mysql.createConnection({host : "localhost",user : "amir",password : "nait",database : "passwordmanager"})

mongoose.connect("mongodb+srv://miroua132:nait@cluster0.q6yitez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")




app.post("/register",(req,res)=>{

   let x= encrypt({password : req.body.password})
   
 /*   con.query("INSERT INTO manager(name,iv,password) values (?,?,?)",[req.body.name,x.iv,x.password],(err,resultat)=>{
       // if(err)throw err;
        res.send(resultat)

        })*/
      
      new model({

        name : req.body.name, 
        iv : x.iv ,
        password : x.password

      }).save().then((result)=>{

        model.find().then((result1)=>{


          res.send(result1)
          
          })



      })
      
      
      })





app.post("/get",(req,res)=>{
    /*
con.query("select iv,password from manager where name=?",[req.body.name],(err,result)=>{
  if(err)throw err;
 
   
res.send(decrypt({iv:result[0].iv,password : result[0].password}))
})*/

model.find({name : req.body.name}).then((result)=>{
  res.send(decrypt({iv:result[0].iv,password : result[0].password}))


})

})





app.get("/getList",(req,res)=>{
    
   /* con.query("select name from manager",(err,resultat4)=>{

        res.send(resultat4)
        
        
        })*/

model.find().then((result)=>{


res.send(result)

})



})


app.listen(3001,()=>{console.log("i am listening")})
