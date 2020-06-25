const mongoose = require('mongoose');
// 链接mongodb  并且使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/zcx-chat';
mongoose.connect(DB_URL);

mongoose.connection.on('connected', () => {
    console.log('mongoose connect success');
})

const models = {
    user: {
        user: { type: String, require: true },
        pwd: { type: String, require: true },
        type: { type: String, require: true },
        // 头像
        avatar: { type: String },
        // 个人简介
        desc: { type: String },
        // 想找的职位名   求职职位 / 招聘职位
        title: { type: String },
        // 如果是boss,还有俩字段
        company: { type: String },
        money: { type: String },
    },
    chat: {
        chatid: { type: String, require: true },
        read: { type: Boolean, default: false },
        from: { type: String, require: true },
        to: { type: String, require: true },
        content: { type: String, require: true, default: '' },
        create_time: { type: Number, default: Date.now },
    }
}

for (const m in models) {
    if (models.hasOwnProperty(m)) {
        const element = models[m];
        mongoose.model(m, new mongoose.Schema(element))
    }
}

module.exports = {
    getModel: name => {
        return mongoose.model(name)
    }
}
