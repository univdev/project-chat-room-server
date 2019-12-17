const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/chatroom');

app.use(cors());
app.disable('x-powered-by');
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(require('./router'));

app.listen('8080', () => {
    console.log('Server is on!');
});