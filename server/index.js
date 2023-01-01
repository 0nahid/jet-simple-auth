const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const cors = require('cors')
app.use(express.json())
app.use(cors())


// Verify Token
function verifyToken(req, res, next) {
    // console.log('req.headers', req.headers);
    const authorization = req.headers.authorization;
    // console.log('authorization', authorization);
    if (!authorization) {
        return res.status(401).send({
            message: 'You did not provide any token',
            status: 401
        })
    }
    const token = authorization.split(" ")[1];
    // console.log(token);

    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: `Invalid Token`,
                status: 401
            })
        }
        req.decoded = decoded;
        // req.yourName = decoded;
        // req.jwtverifiedToken = decoded;
        return next();
    })
}


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjqi2du.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const db = client.db("jwtServer")
const usersCollection = db.collection("users");

// verify admin

async function verifyAdmin(req, res, next) {
    const requester = req.decoded?.email;
    // console.log('your crush mail', requester);
    // console.log(`requester `, requester);
    const requesterInfo = await usersCollection.findOne({ email: requester })
    // console.log(`requesterInfo `, requesterInfo);
    const requesterRole = requesterInfo?.role;
    // console.log(`requesterRole `, requesterRole);
    // if (requesterInfo?.role === 'admin') {
    //     return next();
    // }
    if (requesterRole !== 'admin') {
        return res.status(401).send({
            message: `You are not admin`,
            status: 401
        })
    }
    return next();
}


// user put to db 
app.put("/user/:email", async (req, res) => {
    try {
        const email = req.params.email;
        // console.log(email)
        // check the req
        // console.log(req.body);
        const user = req.body;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
            $set: user
        }
        const result = await usersCollection.updateOne(filter, updateDoc, options);

        // token generate 
        const token = jwt.sign(
            { email: email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        )
        res.send({
            status: "success",
            message: "Token Created Successfully",
            data: token
        })


    }
    catch (err) {
        // console.log(err)
    }
})

// get all users
app.get("/allusers", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await usersCollection.find({}).toArray();
        res.send(user)
    }
    catch (err) {
        // console.log(err)
    }
})


// get single user
app.get("/user/:email", verifyToken, async (req, res) => {
    try {
        const email = req.params.email;
        // console.log(`decode token`, req.decoded);
        // const query = {email:email}
        const user = await usersCollection.findOne({ email });
        res.send({
            status: "success",
            message: "Fetch single user",
            data: user
        })
    }
    catch (err) {
        // console.log(err)
    }
})



// get admin api 
app.get('/user/admin/:email', async (req, res) => {
    try {

        const email = req.params.email;
        // console.log(`email`, email);
        const user = await usersCollection.findOne({ email: email });
        const isAdmin = user?.role === 'admin';
        res.send({
            isAdmin: isAdmin
        })

    } catch (error) {
        console.log(error);
    }
})


app.get('/', (req, res) => res.send({
    status: '200',
    message: `Simple Deployment session`,
    version: '1.0.1',
    author: `@0nahid`,
}))
app.all('*', (req, res) => res.send({
    status: '404',
    message: `No route found!`,
}))

app.listen(port, () => console.log(`JWT simple Auth listening on port ${port}!`))
