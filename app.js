//https://www.tutorialspoint.com/socket.io/socket.io_event_handling.htm

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

var clients = 0;

//A custom namespace
var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket){
  console.log('Someone connected to my-namespace!');
  nsp.emit('hi', 'Hello everyone!');
});
//Whenever someone connects, this is executed
io.on('connection', function(socket){
  clients++;
  console.log('User connected');

  //Send message after a timeout of 4 seconds (4000 milliseconds)
  setTimeout(function(){
    //Send an object when emmiting an event. I think this is some JSON
    socket.emit('testerEvent', {description: 'A custom timeout event named testerEvent'});
  }, 4000);

  //Handle clientEvent
  socket.on('clientEvent', function(data){
    console.log(data);
  });

  /*Broadcast number of connected users
  io.sockets.emit('broadcast', {description: clients + ' clients connected!'});
  */
  //Send to the one socket (new client)
  socket.emit('newclientconnect',{description: 'Welcome to Antz!'});
  //Send to everyone but the new client
  socket.broadcast.emit('newclientconnect',{description: clients + 'clients connected!'});
  //Whenever someone disconnects, this is executed
  socket.on('disconnect', function(){
    clients--;
    io.sockets.emit('broadcast', {description: clients + ' clients connected!'});
    console.log('User disconnected');
  });
});

http.listen(3000, function(){
  console.log('Listening on *:3000');
});
