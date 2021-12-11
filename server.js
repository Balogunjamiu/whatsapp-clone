// const io = require('socket.io')(5000)
// const io = require("socket.io")(httpServer, {
//     cors: {
//       origin: "https://example.com",
//       methods: ["GET", "POST"]
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   })
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
  
  httpServer.listen(5000);

io.on('connection', socket =>{
    const id = socket.handshake.query.id
    console.log('it is working')

    socket.join(id)
    socket.on('send-message', ({recipients, text})=>{
        recipients.forEach(recipient =>{
            const newRecipients = recipients.filter(r => r !== 
                recipient)
            newRecipients.push(id)

            socket.broadcast.to(recipient).emit('receive-message', {
                recipients : newRecipients, sender: id, text
            })
        })
    })

})