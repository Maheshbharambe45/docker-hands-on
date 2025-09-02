const express = require("express")
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello Docker world ");
})

app.listen(5000 , ()=>{
    console.log("App is listining on port 5k");
})