const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');

const host = require('./routes/host');
const visitors = require('./routes/visitors');

// URL to connect to the database.
const MONGODB_URI = `mongodb+srv://harshit:harshit1@@cluster0-nikcw.mongodb.net/test?retryWrites=true&w=majority`;

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Sample Route.
app.get('/', (req, res) => {
    res.send(`Hello`);
});

// Use the visitors route
app.use('/visitors', visitors);
// Use the Host Route
app.use('/host', host);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

// Connecting to the database.
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log('Connected to Database');
    app.listen(3000);
  })
  .catch(err => {
    console.log('Not connected');
  });