const express = require('express');

// we dh import statements like in react , need use require statement to import
const socketio = require('socket.io');
// with socket.io we can do anything which real time data transfer \
// not http req as http requests as they are slow, they are good for serving websites but not for real time data transfer 

const http = require('http'); // built in node module.

const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');





const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();

//creating a server
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());
// cors - cross origin policy - if we dont add it to index.js, some of our sockets might be ignored or nt accepted.


//special methods of socket io
io.on('connection',(socket)=>{

    socket.on('join', ({name, room} , callback) => {

        const {error , user} = addUser({id:socket.id, name, room});

        if (error) return callback(error);
        
        // admin messages when a user joins the room
        // emit here means we are sending a msg from backend to frontend
        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}. `});
        // broadcast means send a msg to everyone except the user
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined. `});
        
        socket.join(user.room);

        io.to(user.room).emit('roomData', {room:user.room, users:getUsersInRoom(user.room)})

        callback();

    });

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        if (user){
            io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})
            // emit the message and send a payload of user and text
        }
    })
    // events for user generated messages
    // on means we are expecting a sendmsg event from the frontend to backend
    // this is listening for sendMessage event
    socket.on('sendMessage',(message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message',{user:user.name, text:message});
        io.to(user.room).emit('roomData', {room:user.room , users: getUsersInRoom(user.room)});

        callback();
    })


});



//middleware
app.use(router);

server.listen(PORT, ()=> console.log(`server has started on port ${PORT}`));




