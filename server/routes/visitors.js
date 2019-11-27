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

// Get all visitors
router.get('/test', (req, res) => {
    res.json({msg : "visitor works"});
});

// Register a new visitor
router.post('/register', (req, res) => {

    // Creating a new visitor object.
    const newVisitor = new Visitor({
        name: req.body.name,
        email : req.body.email,
        phone: req.body.phone,
        checkOutTime : req.body.checkOutTime
    });

    // Parsing the date to send the future mail to visitor
    const hours = parseInt(newVisitor.checkOutTime.substring(0,2));
    const minutes = parseInt(newVisitor.checkOutTime.substring(2,4));
    let finaldate = new Date();
    finaldate.setHours(hours);
    finaldate.setMinutes(minutes); // Date in long and readable format

    const finalDateStamp = Date.parse(finaldate); // Date in time stamp

    // Getting the host details.
    let hostemail = "";
    let hostaddress = "";
    let hostname = "";

    // Check if the host is there or not otherwise we cannot create the visitor.

    Host.find()
    .then(hosts => {
        hostemail = hosts[0].email;
        hostaddress = hosts[0].address;
        hostname = hosts[0].name;
        
        newVisitor.save()
        .then(visitor => {

            console.log('New Visitor Added');
            res.json({msg : "Your Response has been recorder and sent to host."});

            // Sending Email to the Host
            return transporter.sendMail({
                to: hostemail,
                from: 'innovaceer_management@gmail.com',
                subject: 'New Visitor',
                html:`
                <h3> Name : ${newVisitor.name} </h3>
                <h3> Email : ${newVisitor.email} </h3>
                <h3> Phone : ${newVisitor.phone} </h3>
                <h3> Check Out Time : ${finaldate} </h3>
                <h3> Check In Time : ${new Date()} </h3>
                `
            })
            .then(res => {

                console.log('Success Mail 1');

                // Sending mail to visitor after checkout.
                    return transporter.sendMail({
                    to: newVisitor.email,
                    from: 'innovaceer_management@gmail.com',
                    subject: 'Your Visit Details',
                    html:`
                    <h3> Name : ${newVisitor.name} </h3>
                    <h3> Host Name : ${hostname} </h3>
                    <h3> Phone : ${newVisitor.phone} </h3>
                    <h3> Check Out Time : ${finaldate} </h3>
                    <h3> Check In Time : ${visitor.checkInTime} </h3>
                    <h3> Address : ${hostaddress} </h3>
                    `
                    // date : finalDateStamp
                    // We can put the finalDateStamp here to send the mail at the scheduled time although Sendgrid API was not supporting this feature at the time of creating it.
                })
                .then(res => {
                    console.log('Success Mail 2');
                })
                .catch(err => 'Error in sending mail 2');
            })
            .catch(err => 'Error in sending mail 1');
        })
        .catch(err => {
            console.log(`Error in creating the new visitor! \n ${err}`);
        });

    })
    .catch(err => {
        console.log('No Hosts found');
        res.json({msg : "No Host Found! Please add the host"});
    })
});

module.exports = router;