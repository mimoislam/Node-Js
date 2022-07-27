
var http = require('http');

const bodyParser = require("body-parser");

var shell=require("./shellFunction")
var status_TYPE=require("./Status")
const {default: simpleGit, CleanOptions} = require('simple-git');
simpleGit().clean(CleanOptions.FORCE);


const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
var shell=require("./shellFunction")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(req.body.key))

app.post('/request',function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    shell.shell(req.body)
    res.send(req.body);
})

server.listen(3000, () => console.log(`Lisening on port :3000`))