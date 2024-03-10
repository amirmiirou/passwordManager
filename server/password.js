const crypto=require("crypto")
const secret="pppppppppppppppppppppppppppppppp"


const encrypt=(data)=>{

const iv=Buffer.from(crypto.randomBytes(16))
const cipher=crypto.createCipheriv("aes-256-ctr",Buffer.from(secret),iv)
const result=Buffer.concat([cipher.update(data.password),cipher.final()])


return {iv:iv.toString("hex"),password : result.toString("hex")}

}


const decrypt=(encryption)=>{

const decipher=crypto.createDecipheriv("aes-256-ctr",Buffer.from(secret),Buffer.from(encryption.iv,"hex"))
const result=Buffer.concat([decipher.update(Buffer.from(encryption.password,"hex")),decipher.final()])


return result.toString()



}





module.exports={encrypt,decrypt}