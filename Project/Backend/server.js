const http = require("http");
const app = require("./app");
const socket = require("socket.io");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 8080;






console.log(port);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

const server = http.createServer(app);

const serv = server.listen(port);
const io = socket(serv, {
    cors: {
        origin: "*",
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            if(data.delete){
                socket.to(sendUserSocket).emit("msg-recieve", {message: data.message, image: data.image, id: data.id, delete: data.delete});
            }else{
                socket.to(sendUserSocket).emit("msg-recieve", {message: data.message, image: data.image, id: data.id});
            }
        }
    });
});
