const mongoose = require('mongoose');
const mainServer = require('./src/server/main');
const authServer = require('./src/server/auth');

mongoose.connect('mongodb://127.0.0.1/Ecommerce')
        .then(() => {
            mainServer.listen(5000, () => {
                console.log("Main Server is running on port: 5000")
            })
            authServer.listen(5500, () => {
                console.log("Authentication Server is running on port: 5500")
            })
        })