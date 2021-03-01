
var socket;
var io;

function socketHandler(Socket,Io){
    socket = Socket
    io = Io
    console.log('socket:', socket)
    console.log('//////////io:', io)
}

function loadMixes(value) {
 console.log('value:', value)
 socket.emit('update','go back')

}


module.exports = {
    loadMixes,socketHandler
  
}