const env = require('dotenv');
const jwt = require('jsonwebtoken');
env.config();

function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1]

    if (!token) return res.sendStatus(401)
    
    jwt.verify(token, process.env.access_key, (err, data) => {      
        if (err) return res.sendStatus(403)
        
        const {id, username} = data;
        req.user = {id, username};
        next();
    })
}

module.exports = {
    auth
}