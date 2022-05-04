const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');


var shell=require("./shellFunction")
var status_TYPE=require("./Status")
const {default: simpleGit, CleanOptions} = require('simple-git');
simpleGit().clean(CleanOptions.FORCE);


console.log(process.cwd());















const wss = new WebSocket.Server({ server:server });

let  status=status_TYPE.LIBRE;
module.exports=status;

wss.on('connection', function connection(ws) {

  console.log('A new client Connected!');
  /// send the status of this  to the new connection  established 
  ws.send(
    JSON.stringify({
      'status':status
    })
    
    );
  
  ws.on('close', function() {

    console.log('Connection Closed');
  
  });

//// when connection is closed  for this client 
    ws.on('close', function() {
        console.log('Connection Closed');
    });
    /// when client sends message 
  ws.on('message', function incoming(message) { 
    status=status_TYPE.OCCUPIED;
    
    //shell.shell();
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          'status':status
        }));
      }
    });

  });
});

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(3000, () => console.log(`Lisening on port :3000`))
