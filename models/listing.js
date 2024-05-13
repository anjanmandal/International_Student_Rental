const mongoose= require("mongoose");
const listingSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    descrtiption:String,
    image: {
        filename: String, // Store the filename
        url: {            // Store the URL and use a default if necessary
            type: String,
            default: "https://unsplash.com/photos/a-view-of-a-city-at-night-from-the-top-of-a-hill-F3T76h8iguI"
        }
    },
    price:Number,
    location:String,
    country:String
}); 
const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;