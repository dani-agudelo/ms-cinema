import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
    console.log('new connection')
    let id = socket.id;
    const { body } = socket.handshake.query;
    console.log('se conecto el usuario', id, body);

    socket.emit('news', { hello: 'world' })

    socket.on('my other event', (data) => {
        console.log(data)
    })
})
