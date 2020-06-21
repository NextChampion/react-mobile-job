const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('user login');
    socket.on('sendmsg', text => {
        console.log('收到的消息: ', text);
        io.emit('receivemsg', text);
    })
});



const userRouter = require('./user');
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, () => {
    console.log('express socket start at port 9093');
})