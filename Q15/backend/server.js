const express=require('express');
const app=express();
const cors=require('cors');

const port=3000;

app.use(cors());

app.use((req,res,next)=>{
    const timestamp=new Date().toISOString();
    console.log(`${timestamp} ${req.method} ${req.originalUrl}`);
    next();
})

app.get("/info",(req,res)=>{
    res.json("Route has accessed");
});

app.get("/status",(req,res)=>{
    res.json({
        status:"server is running",
        timestamp:new Date().toISOString()
    });
})

app.use((req, res) => {
  res.status(404).json("Error: route not found");
});


app.listen(port,()=>{
    console.log(`App is listening to port no : ${port}`)
})