let express= require("express");
const app= express();
const path=require("path");
const listing = require("./models/listing.js")
const mongoose=require("mongoose");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));

//---------for delete request method_override
const methodOverride=require('method-override');
app.use(methodOverride('_method'));

//------------using ejs mate to create template for common in all pages like nav-bar and footer etc.....
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);

//------------for the public folder we are using for the css---------------
app.use(express.static(path.join(__dirname,"/public")))
 

app.listen(8080,()=>{
    console.log(`listening to the port 8080.`)
})
main().then(()=>{
    console.log("Connected to DB..")
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Mybnb')
}
app.get("/",(req,res)=>{
    console.log("server is listening....");
})

//below is the way to add to the mongodb. you cannot use inser here.
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
});

//------------------------will show all the listings--------------------------------
app.get("/listings",async(req,res)=>{
    const allListings=await listing.find({});
    res.render("./listings/index.ejs",{allListings}) 
});


//----------------------details for each listings----------------------------
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const item=await listing.find({_id:id}); // or  listing.findById(id)
    console.log(item);
})


//-----------------------getting to add new listings requests------------------------
app.get("/add-listing",(req,res)=>{
    res.render("./listings/add.ejs")
});

//-----------------------adding the new listing------------------
app.post("/add-listing",async(req,res)=>{
    let{title,description,imageURL,price,location,country}=req.body;
    let newItem= new listing(
        {title:title,
         description:description,
         picture:{
            filename:"",
            url:imageURL
         },
         price:price,
         location:location,
         country:country
        }
    )
    await newItem.save();
    console.log("successfull")
    res.redirect("/listings");
});

//------------------------Update listing-------------------------------------

//-------------------------Delete listing------------------------------------
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
   await listing.deleteOne({_id:id});
    res.redirect("/listings");
})