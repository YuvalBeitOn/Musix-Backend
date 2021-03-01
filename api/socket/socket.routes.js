const { loadMixes, socketHandler } = require('./socket.service');

var counter = 0

function connectSockets(io) {

    io.on('connection', socket => {
        socketHandler(socket, io)
        counter++
        console.log('connection !!' + counter)
        socket.on('load', loadMixes)
    })
}

module.exports = { connectSockets }