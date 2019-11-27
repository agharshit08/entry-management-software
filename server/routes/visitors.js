const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');


// Get all visitors
router.get('/test', (req, res) => {
    res.json({msg : "visitor works"});
});

// Register a new visitor
router.post('/register', (req, res) => {
    const newVisitor = new Visitor({
        name: req.body.name,
        email : req.body.email,
        phone: req.body.phone,
        checkOutTime : req.body.checkOutTime
    });

    newVisitor.save()
    .then(visitor => {
        console.log('New Visitor Added');
        // Send email here
        
    })
    .catch(err => {
        console.log(`Error in creating the new visitor! \n ${err}`);
    });
});

module.exports = router;