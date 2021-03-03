var socket;
var io;

function socketHandler(Socket, Io) {
    socket = Socket
    io = Io
}

function loadMixes() {
    socket.broadcast.emit('load-mixes')
}

function setMix(mixId) {
    if (socket.mix) {
        socket.leave(socket.mix)
    }
    socket.join(mixId)
    socket.mix = mixId

}

function loadMix() {
    socket.broadcast.to(socket.mix).emit('load-mix')
}


module.exports = {
    loadMixes, socketHandler, setMix, loadMix

}