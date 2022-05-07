
var http = require('http');


var shell=require("./shellFunction")
var status_TYPE=require("./Status")
const {default: simpleGit, CleanOptions} = require('simple-git');
simpleGit().clean(CleanOptions.FORCE);

















// const wss = new WebSocket.Server({ server:server });

// let  status=status_TYPE.LIBRE;
// module.exports=status;

// wss.on('connection', function connection(ws) {

//   console.log('A new client Connected!');
//   /// send the status of this  to the new connection  established 
//   ws.send(
//     JSON.stringify({
//       'status':status
//     })
    
//     );
  
//   ws.on('close', function() {

//     console.log('Connection Closed');
  
//   });

// //// when connection is closed  for this client 
//     ws.on('close', function() {
//         console.log('Connection Closed');
//     });
//     /// when client sends message 
//   ws.on('message', function incoming(message) { 
//     status=status_TYPE.OCCUPIED;
    
//     shell.shell('https://github.com/mimoislam/gamma');
//      wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({
//           'status':status
//         }));
//       }
//     });

//   });
// });
var sendInterval = 5000;

function sendServerSendEvent(req, res) {
  res.writeHead(200, {
  'Content-Type' : 'text/event-stream',
  'Cache-Control' : 'no-cache',
  'Connection' : 'keep-alive',
  'Access-Control-Allow-Credentials': true
  });
  
  
  setInterval(function() {
  writeServerSendEvent(res,{status:0});
  }, sendInterval);
  
  writeServerSendEvent(res, {status:0});
 }
  
 function writeServerSendEvent(res, data) {
  res.write("data:" + JSON.stringify(data) + '\n\n');
 }
 let  status=status_TYPE.LIBRE;
http.createServer(function(req, res) {

  if (req.url == '/status') {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
     res.setHeader('Access-Control-Allow-Credentials', true);
  sendServerSendEvent(req, res);
  } else{
    if (req.url == '/start') {

      
    status=status_TYPE.OCCUPIED;
    shell.shell('https://github.com/mimoislam/gamma');


   }  else {
    res.writeHead(404);
    res.end();
    }
  }
 
  
 }).listen(3000);


