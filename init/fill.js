const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const allData = require("./data.js");

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Mybnb');
        console.log("Connected to DB..");
        await initDB();
    } catch (err) {
        console.error("Error connecting to the database or initializing data:", err);
    }
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(allData.data);
        console.log("Database is initialized..");
    } catch (err) {
        console.error("Error during database initialization:", err);
    }
};

main();
