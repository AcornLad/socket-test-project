var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

//Whenever someone connects, this is executed
io.on('connection', function(socket){
  console.log('User connected');

  //Whenever someone disconnects, this is executed
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });
});

http.listen(3000, function(){
  console.log('Listening on *:3000');
});
