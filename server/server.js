const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

const model = require('./model');
const Chat = model.getModel('chat');

io.on('connection', function (socket) {
    socket.on('sendmsg', data => {
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
            io.emit('recvmsg', Object.assign({}, doc._doc));
        })
    })
});



const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, () => {
    console.log('express socket start at port 9093');
})