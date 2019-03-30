let mongoose = require("mongoose")


let schema = new mongoose.Schema({
    name: String,
    location: {
        lat: Number,
        lng: Number,
    },
    foodList: [String],
})

module.exports = mongoose.model('Restaurant', schema)