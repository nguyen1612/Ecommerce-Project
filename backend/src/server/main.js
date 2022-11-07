const helmet = require('helmet');
const cors = require('cors');

const express = require('express');
const app = express();

const { auth } = require('../utils');

const user = require('../route/user/user');

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/user', auth, user);


module.exports = app;