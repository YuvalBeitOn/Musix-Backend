<<<<<<< HEAD

const chalk = require('chalk');
// var socket;
// var io;
=======
var socket;
var io;
>>>>>>> 180f6e885da585f1f66ea393d701526eca6a19c7

function socketHandler(Socket, Io) {
    socket = Socket
    io = Io
 
}

function loadMixes() {
  
 console.log(  chalk.bold.green('update mixes: send event to load all'))
 io.emit('mixes-update')
}

function setMix(mixId) {
    if(socket.mix){
        socket.leave(socket.mix)
    }
    socket.join(mixId)
    socket.mix = mixId
    console.log('socket.mix:', socket.mix)
   
}

function loadMix() {
    console.log( chalk.bold.red('one mix is update sending event'))

    io.to(socket.mix).emit('mix-update')
}


module.exports = {
    loadMixes,socketHandler,setMix,loadMix
  
}