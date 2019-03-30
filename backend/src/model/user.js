let mongoose = require("mongoose")


let userSchema = new mongoose.Schema({
    email: String,
    password: String,
    location: {
        lat: Number,
        lng: Number,
    },
})

module.exports = mongoose.model('User', userSchema)