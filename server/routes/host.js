const express = require('express');
const router = express.Router();
const Host = require('../models/Host');

// Testing Host
router.get('/test', (req, res) => {
    res.json({msg : "Host works"});
});

// Registering the host
router.post('/register', (req, res) => {
    const newHost = new Host({
        name: req.body.name,
        email : req.body.email,
        phone: req.body.phone,
        address : req.body.address
    });

    newHost.save()
    .then(host => {
        res.json({msg : "Success"});
        console.log('New Host Added');
    })
    .catch(err => {
        res.json({msg : "Failed"});
        console.log(`Error in creating the new host! \n ${err}`);
    });
});

module.exports = router;