let express= require("express");
const app= express();
const listing = require("./models/listing.js")
const mongoose=require("mongoose");
app.listen(8080,()=>{
    console.log(`listening to the port 8080.`)
})
main().then(()=>{
    console.log("Connected to DB..")
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Mybnb')
}
app.get("/testDb",async(req,res)=>{
    let sample= new listing(
        {title: "601 N McGuire Ave",
         description:"red brick house",
         price:800,
         location:"Monore",
         country:"USA"
        }
    )
    await sample.save();
    console.log("sample was saved to DB");
    res.send("successfull");
})

app.get("/",(req,res)=>{
    console.log("server is listening....")
})