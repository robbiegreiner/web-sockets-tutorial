var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('typing', function(user) {
    io.emit('A user is typing!', user)
  })

  socket.on('no typing', function() {
    io.emit('remove indicator')
  })

  io.emit('connection status', 'A New User Has Connected To Chat!');

  socket.on('disconnect', function() {
    io.emit('connection status', 'A user has left the chat!')
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
