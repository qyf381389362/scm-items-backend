const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let ScmItem = require('./models/scmItem');

mongoose.connect("mongodb://localhost/scmitem", {
    useNewUrlParser: true
});
let db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to Mongodb');
});

db.on('error', function (err) {
    console.log(err);
});

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/api/save', (req, post) => {
    let key = req.params.key;
    let content = req.params.content;
    // console.log(key, content, 'post请求已经拿到了数据');
    console.log(JSON.stringify(req.body));
});

app.get('/api/test', (req, res) => {
    // ScmItem.find({}, (err, item) => {
    //     res.send(item);
    // });
    ScmItem.find({}, (err, items) => {
        if (err) console.log(err);
        console.log(items);
        // res.send(item);
    });
    // console.log(req);
    // res.send('sucess');
});

app.get('/api/common/members', (req, res) => {
    ScmItem.find({}, (err, item) => {
        res.send(item);
    });
});

app.listen(3002, function () {
    console.log("Server started on port 3002...");
});