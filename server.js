const express = require("express")
const app = express();

//setup socket.io to sit along the seerver and makes sociket.io/soicket.io.js work

const server = require("http").createServer(app)
const io = require("socket.io")(server)

//serve files out of public folder

app.use(express.static(__dirname + "/public"))

let userConnections = []
io.on("connection", function(socket){
  console.log("new connection from " + socket.id)
  console.log(userConnections.length +1 + " users connected")
  userConnections.push(socket.id)
  socket.on('send',function(event){
    console.log('--got a message')
    console.log(event)
    io.emit('message-from-friend', event)
  })

socket.on('disconnect',function(event){
  console.log('user disconnected')
  let index = userConnections.indexOf(socket.id)
  userConnections.splice(index,1)
  console.log('connected users now ', userConnections.length)
})

})



//use the server variable to listen or socket.io wont work
server.listen(3000, () =>{
  console.log('server listening on 3000')
})
