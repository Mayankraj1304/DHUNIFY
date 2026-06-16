const mongoose = require("mongoose");


async function connectToDatabase() {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB server is connected")
}



module.exports = connectToDatabase;