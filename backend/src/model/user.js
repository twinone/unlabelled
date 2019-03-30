let mongoose = require("mongoose")


let schema = new mongoose.Schema({
    email: String,
    password: String,
    location: {
        lat: Number,
        lng: Number,
    },
})

module.exports = mongoose.model('User', schema)