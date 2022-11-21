const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cors = require('cors')
app.use(express.json())
app.use(cors())


// Verify Token

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjqi2du.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const db = client.db("jwtServer")
const usersCollection = db.collection("users");

// verify admin


// get all users
app.get("/users", async (req, res) => {
    try {
        const user = await usersCollection.find({}).toArray();
        res.send({
            status: "success",
            message: "Fetch all users",
            data: user
        })
    }
    catch (err) {
        console.log(err)
    }
})



// user put to db 


// get single user
app.get("/user/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const user = await usersCollection.findOne({ email });
        res.send({
            status: "success",
            message: "Fetch single user",
            data: user
        })
    }
    catch (err) {
        console.log(err)
    }
})



app.get('/', (req, res) => res.send({
    status: '200',
    message: `Simple JWT Server!`,
    version: '1.0.0',
    author: `@0nahid`,
}))
app.all('*', (req, res) => res.send({
    status: '404',
    message: `No route found!`,
}))

app.listen(port, () => console.log(`JWT simple Auth listening on port ${port}!`))