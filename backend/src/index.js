// model imports
const User = require('./model/user')

const express = require('express')
const app = express()
const port = 3000

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

app.get('/', (req, res) => {
    res.send('404, Unlabeled')
})

app.get('/register/:email/:pass/:lat/:lng', (req, res) => {
    //Remove all users
    // User.find(function (err, users) {
    //     if (err) return res.json(newErr("could not find"))
    //     users.forEach(function (user) {
    //         user.remove()
    //     })
    // })


    let resp = newResp()

    let user = new User({
        email: req.params.email,
        password: req.params.pass,
        location: {
            lat: req.params.lat,
            lng: req.params.lng
        }
    })

    User.find({
        email: req.params.email,
    }, function (err, users) {
        if (err) return res.json(newErr("error checking existing users"))
        if (users.length !== 0) {
            return res.json(newErr("user already exists"))
        }

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
        console.log(users)
        if (err) return res.json(newErr("could not find user while login"))
        if (users.length !== 1)
            return res.json(newErr("invalid credentials, size="+users.length))
        resp.token = users[0]._id
        res.json(resp)
    })
})


setupDB()


app.listen(port, () => console.log(`Example app listening on port ${port}!`))