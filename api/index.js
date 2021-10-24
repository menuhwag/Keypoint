const express = require('express');
const cors = require('cors');
const router = require('./router');
const mongoose = require('mongoose');
require('dotenv').config();

const cors_origin = process.env.CORS_ORIGIN;
const mongoURL = process.env.MONGODB;

mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
mongoose.connect(mongoURL)
    .then((response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const corsOptions = {
    origin: cors_origin,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use('/api', router);
app.use('/images', express.static(__dirname + '/../uploads'))

const port = 3000;

app.listen(port, function(){
    console.log('server on! http://localhost:'+port);
});