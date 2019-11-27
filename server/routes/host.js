const express = require('express');
const router = express.Router();
const Host = require('../models/Host');

router.get('/test', (req, res) => {
    res.json({msg : "Host works"});
});

router.post('/register', (req, res) => {
    const newHost = new Host({
        name: req.body.name,
        email : req.body.email,
        phone: req.body.phone,
        address : req.body.address
    });

    newHost.save()
    .then(host => {
        console.log('New Host Added');
    })
    .catch(err => {
        console.log(`Error in creating the new host! \n ${err}`);
    });
});

module.exports = router;