const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect('mongodb+srv://ronin2004:Harsh2004@cluster0.xvv4ezm.mongodb.net/peersphere')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

const mainRouter = require('./routes/index');
app.use("/api/v1", mainRouter);

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
