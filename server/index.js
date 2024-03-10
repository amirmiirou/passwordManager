const http=require("http")
const express=require("express")
const mysql=require("mysql")

const cors=require("cors")
const app=express()
const {encrypt,decrypt}=require("./password")
const server=http.createServer(app)
app.use(cors({origin : "http://localhost:3000"}))
app.use(express.json())
let con=mysql.createConnection({host : "localhost",user : "root",password : "",database : "passwordmanager"})
con.connect()

app.post("/register",(req,res)=>{

   let x= encrypt({password : req.body.password})
   
    con.query("INSERT INTO manager(name,iv,password) values (?,?,?)",[req.body.name,x.iv,x.password],(err,resultat)=>{
       // if(err)throw err;
        res.send(resultat)

        })})





app.post("/get",(req,res)=>{
    
con.query("select iv,password from manager where name=?",[req.body.name],(err,result)=>{
  if(err)throw err;
 
   
res.send(decrypt({iv:result[0].iv,password : result[0].password}))
})})





app.get("/getList",(req,res)=>{
    
    con.query("select name from manager",(err,resultat4)=>{
   //     if(err)throw err;

        res.send(resultat4)
        
        
        })


})


app.listen(3001,()=>{console.log("i am listening")})
