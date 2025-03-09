const mongoose = require('mongoose');




const URI = process.env.MONGODB_URI;


const connectDb = async ()=> {
    try {

        await mongoose.connect(URI);
        console.log("MongoDB Connected");
    }catch{
        console.log("Error connecting to database")
        process.exit(0);
    }
}

module.exports =  connectDb;