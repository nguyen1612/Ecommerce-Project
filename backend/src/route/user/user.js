const express = require('express');
const router = express.Router();

const User = require('../../model/User');


router.get('/', async (req, res) => {
    // console.log(req.user)

    res.sendStatus(200);
})


module.exports = router;
