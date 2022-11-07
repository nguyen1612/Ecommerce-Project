const helmet = require('helmet');
const cors = require('cors');
const env = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');

const User = require('../model/User');

const app = express();
env.config();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.post('/login', login_validate, async (req, res) => {
    const {username, password} = req.user;
``
    const user = await User.findOne({username});

    if (!user)
        return res.status(404);

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid)
        return res.sendStatus(400).json({msg: "invalid password"});
    
    const data_token = {id: user._id.toString(), username};
    const access_token = generateToken(data_token);

    res.status(200).json({access_token});
})


app.post('/signup', signup_validate, async (req, res) => {
    const {username, email, password} = req.user;

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = new User({username, email, password: hashPass});
    await user.save();

    const data_token = {id: user._id.toString(), username, email};
    const access_token = generateToken(data_token);

    res.status(200).json({access_token});
})

app.get('/refresh', (req, res) => {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1]

    if (!token) return res.sendStatus(401)
    
    jwt.verify(token, process.env.access_key, (err, data) => {      
        if (err) return res.sendStatus(403)
        
        const data_token = {id: data.id, username: data.username, email: data.email};
        const access_token = generateToken(data_token);
        res.status(200).json({access_token});
    })
})


function signup_validate(req, res, next) {
    const keys = Object.entries(req.body);

    if (keys.length < 3)
        return res.sendStatus(400);

    try {
        const {username, email, password} = req.body;
        
        // check typeof data
        if (notType(username, 'string') || notType(email, 'string') || notType(password, 'string'))
            return res.sendStatus(400);

        // check username
        if (username.length < 6 || username.length > 25)
            return res.status(400).json({msg: 'USERNAME'});

        // Check email
        if (email.length < 1 || !email.includes('@'))
            return res.status(400).json({msg: 'EMAIL'});

        // Check password
        if (password.length < 6)
            return res.status(400).json({msg: 'PASSWORD'});

        // Database Check
        User.find({$or: [{username}, {email}]}, (err, data) => {
            if (err) return res.sendStatus(400);
            if (data.length > 0) return res.status(400).json('data existed');

            req.user = req.body;
            next();
        })
    } catch (err) {
        res.sendStatus(400);
    }
}

function login_validate(req, res, next) {
    const keys = Object.entries(req.body);
    
    if (keys.length < 2)
        return res.status(400).json({msg: 'invalid length'})

    try {
        const {username, password} = req.body;

        if (notType(username, 'string') || notType(password, 'string'))
            return res.status(400).json({msg: 'invalid data'});


        if (username.length < 1 || password.length < 1)
            return res.status(400).json({msg: 'invalid username/password length'});
        
        req.user = {username, password}
        next();
    } catch (err) {
        res.sendStatus(400)
    }
}

function notType(data, type) {
    return typeof data !== type
}

function generateToken(data) {
    return jwt.sign(data, process.env.access_key, {expiresIn: '1m'})
}

module.exports = app;