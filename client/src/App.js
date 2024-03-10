import {  useEffect, useState } from 'react';
import './App.css';
import axios from "axios"


function App() {
const [password,setPassword]=useState()
const [account,setForAccount]=useState()
const [list,setList]=useState(null)


useEffect(()=>{

if(list===null){

  axios.get("http://localhost:3001/getList").then((result)=>{

  setList(result.data)
  
  })

}

},[list])


  return (
    <div className="App w-screen h-screen flex justify-center items-start">
    <div className='flex flex-col w-1/2 h-full '>
<div className='bg-blue-200 flex flex-col w-3/4 items-center gap-5 pt-10 pb-10 mt-10 h-2/4'>
<input className='w-3/4 h-10 rounded-lg' type="text" placeholder='Ex. password123' onChange={(e)=>{setPassword(e.target.value)}} />
<input className='w-3/4 h-10 rounded-lg' type="text" placeholder='Ex. LinkedIn'  onChange={(e)=>{setForAccount(e.target.value)}}/>
<button className='bg-slate-200 rounded-lg w-3/4 h-10' onClick={()=>{axios.post("http://localhost:3001/register",{name : account,password : password}).then((result)=>{

})}}>save</button>
</div>

{list===null ? null : <div className='h-2/4  overflow-y-auto flex flex-col w-3/4 items-center gap-5 mt-10'>{Object.values(list).map((e,i)=>{return(

<div className='w-3/4' key={i}><button className='bg-black text-white w-full h-10 rounded-lg' onClick={()=>{


axios.post("http://localhost:3001/get",{name : e.name}).then((result)=>{
  alert(e.name+" password is : "+ result.data)


})


}}>{e.name}</button></div>

)

})}</div>


}


</div>





    </div>
  );
}

export default App;
