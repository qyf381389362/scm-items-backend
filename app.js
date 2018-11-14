const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let ScmItem = require('./models/scmItem');

mongoose.connect("mongodb://admin:admin123@ds159661.mlab.com:59661/scmitem", {
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/api/update', (req, res) => {
    const item = JSON.stringify(req.body)
    const itemObj = JSON.parse(item);
    let itemInDataBase;
    // console.log(itemObj);
    ScmItem.findOne({"key": itemObj.key}, (err, item) => {
        new Promise((resolve, reject) => {
            if (err) reject(err);
            console.log(item, 'test1');
            resolve(item);
            // itemInDataBase = item;
            // console.log(itemInDataBase, 'test2');
            // res.send(item);
        });
    }).then((item) => {
        if  (!item) {
            console.log('为空');
            let newItem = new ScmItem(itemObj);
            newItem.save((err) => {
                if (err) {
                    console.log(err);
                    res.send('falied');
                } else {
                    res.send('success');
                }
            });
        } else {
            console.log('不为空');
            ScmItem.updateOne({"key": itemObj.key}, req.body, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.send('success');
            });
        }
    });
});

app.get('/api/info', (req, res) => {
    ScmItem.findOne({ "key": req.query.key}, (err, item) => {
        if (err) console.log(err);
        res.send(item);
    });
});

app.listen(3002, function () {
    console.log("Server started on port 3002...");
});