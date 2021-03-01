const { loadMixes,socketHandler,setMix,loadMix } = require('./socket.service');


var counter = 0

function connectSockets(io) {

    io.on('connection', socket => {
        socketHandler(socket, io)
        counter++
        console.log('connection !!' + counter)
        socket.on('set-mix-id',setMix)
        socket.on('mix-update',loadMix)
        socket.on('mixes-update',loadMixes)
       
    })
}

module.exports = { connectSockets }