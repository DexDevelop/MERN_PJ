const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');


const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
// const db = require('./config/keys').mongoURI;
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db, {iseNewUrlParser: true, useCreateIndex: true}) //Adding new mongo url parser
    .then(() => console.log('MongoDB Connect...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Sever started on port ${port}`));