// model imports
const User = require('./model/user')
const Restaurant = require('./model/restaurant')


const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = 17001

let db

function onDBConnected() {
    console.log("DB Connected")

}
function setupDB() {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost/unlabelled', {useNewUrlParser: true})
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', onDBConnected)
}


function newResp() {
    return {status: "ok"}
}

function newErr(err) {
    return {status: "error", error: err}
}

app.use(cookieParser())
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // support encoded bodies


/// USER REGISTRATION

app.get('/register/:email/:pass/:lat/:lng', (req, res) => {
    //Remove all users
    // User.find(function (err, users) {
    //     if (err) return res.json(newErr("could not find"))
    //     users.forEach(function (user) {
    //         user.remove()
    //     })
    // })


    let resp = newResp()


    User.find({
        email: req.params.email,
    }, function (err, users) {
        if (err) return res.json(newErr("error checking existing users"))
        if (users.length !== 0) {
            return res.json(newErr("user already exists"))
        }


        // Create a new user
        let user = new User({
            email: req.params.email,
            password: req.params.pass,
            location: {
                lat: req.params.lat,
                lng: req.params.lng
            }
        })
        console.log("Creating user", user)
        user.save(function (err, user) {
            if (err) return res.json(newErr("could not save user"))
            resp.token = user._id
            res.json(resp)
        })
    })
})

app.get('/login/:email/:pass', (req, res) => {
    let resp = newResp()

    User.find({
        email: req.params.email,
        password: req.params.pass
    }, function (err, users) {
        // console.log(users)
        if (err) return res.json(newErr("could not find user while login"))
        if (users.length !== 1)
            return res.json(newErr("invalid credentials, size=" + users.length))
        resp.token = users[0]._id
        res.json(resp)
    })
})


/// RESTAURANT REGISTRATION


app.post('/restaurant/register', (req, res) => {
    let resp = newResp()
    console.log("cookies", req.cookies)

    // parse the body
    console.log("body:", req.body)
    let body = req.body
    if (!body.name || !body.location || !body.foodTypes
        || !body.location.lat || !body.location.lng) {
        return res.json(newErr("invalid request"))
    }


    Restaurant.find({
        name: body.name,
    }, function (err, restaurants) {
        if (err) return res.json(newErr("could not find restaurant while register"))
        if (restaurants.length > 0)
            return res.json(newErr("restaurant already exists"))


        // Create a new restaurant
        let restaurant = new Restaurant(req.body)
        restaurant.save(function (err, restaurant) {
            if (err) return res.json(newErr("could not save restaurant"))
            resp.token = restaurant._id

            console.log("no cookies for you")
            res.cookie('restaurant-token', restaurant._id)
            console.log(res.headers)
            res.json(resp)
        })


    })
})

app.use('/', express.static('../frontend/build'))


setupDB()


app.listen(port, () => console.log(`Example app listening on port ${port}!`))