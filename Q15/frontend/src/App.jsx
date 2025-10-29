import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [response,setResponse]=useState("");

  const setRoute=async (route)=>{
    try{
      let res=await fetch(`http://localhost:3000/${route}`);
    let data=await res.json();
    setResponse(JSON.stringify(data,null,2));
    }
     catch(err)
    {
      console.log(err);
    }
  }
  
  

  return (
    <>
    <h1>Incoming Requests</h1>
      <button onClick={()=>setRoute("info")}>Get /info</button>
        <br></br>
        <br></br>
       <button onClick={()=>setRoute("*")}>Get /status</button>
      <pre>{response}</pre>
    </>
  )

}

export default App
