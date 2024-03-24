const mongoose = require('mongoose')

function connectDb() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB!")
    })
    .catch((error) => {
        console.log(error.message)
    })
}


module.exports = connectDb