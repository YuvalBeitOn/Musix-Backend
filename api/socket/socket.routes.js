const { loadMixes, socketHandler, setMix, loadMix } = require('./socket.service');

function connectSockets(io) {

    io.on('connection', socket => {
        socketHandler(socket, io)
        socket.on('set-mix-id', setMix)
        socket.on('mix-update', loadMix)
        socket.on('mixes-update', loadMixes)

    })
}

module.exports = { connectSockets }