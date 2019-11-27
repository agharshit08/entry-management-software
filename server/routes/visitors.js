const express = require('express');
const Visitor = require('../models/Visitor');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Host = require('../models/Host');

const router = express.Router();

// Transporter for SendGrid
const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: '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',
      }
    })
);
// Getting the host email.
let hostemail = "";

Host.find()
.then(hosts => {
    hostemail = hosts[0].email;
    console.log(hostemail);
})
.catch(err => {
    console.log('No Hosts found');
})

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
        // Sending Email to the Host
        return transporter.sendMail({
            to: hostemail,
            from: 'innovaceer_management@gmail.com',
            subject: 'New Visitor',
            html:`
            <h3> Name : ${newVisitor.name} </h3>
            <h3> Email : ${newVisitor.email} </h3>
            <h3> Phone : ${newVisitor.phone} </h3>
            <h3> Check Out Time : ${newVisitor.checkOutTime} </h3>
            <h3> Check In Time : ${Date.now} </h3>
            `,
        })
        .then(res => {
            console.log('Success');
        })
        .catch(err => 'Error in sending mail');
    })
    .catch(err => {
        console.log(`Error in creating the new visitor! \n ${err}`);
    });
});

module.exports = router;