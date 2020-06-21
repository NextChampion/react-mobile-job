const express = require('express');
const utils = require('utility');

const Router = express.Router();
const model = require('./model');

const User = model.getModel('user');

// 统一的一个过滤条件,不允许结果内显示用户密码和版本信息
const _filter = { pwd: 0, __v: 0 };

// 查询所有用户列表
Router.get('/list', (req, res) => {
    // User.remove({},()=>{});
    const { type } = req.query;
    User.find({ type }, (err, doc) => {
        if (err) {
            return res.json({ success: false, code: 1 })
        }
        return res.json({ success: true, code: 0, data: doc });
    })
})

// 用户注册
Router.post('/register', (req, res) => {
    // 解析出来post过来的信息
    const { user, pwd, type } = req.body;
    User.findOne({ user }, (err, doc) => {
        if (err) {
            return res.json({ success: false, code: 1, message: err })
        }
        if (doc) {
            return res.json({ success: false, code: 1, message: '用户已存在' })
        }
        // 因为使用create方法,无法获取到_id的信息,从而不能设置cookie,所以此处改为save方法
        const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
        userModel.save((error, doc) => {
            if (error) {
                return res.json({ success: false, code: 1, message: error })
            }
            const { user, type, _id } = doc;
            res.cookie('userid', _id);
            return res.json({ success: true, code: 0, data: { user, type, _id } })
        })
        // User.create({ user, type, pwd: md5Pwd(pwd) }, (error, doc) => {
        //     if (error) {
        //         return res.json({ success: false, code: 1, message: error })
        //     }
        //     return res.json({ success: true, code: 0, data: doc })
        // })
    })
})

// 用户登录
Router.post('/login', (req, res) => {
    // 解析出来post过来的信息
    const { user, pwd } = req.body;
    // findOne 第一个参数是查找的条件, 第二个参数是将pwd设置为0  要求在返回的结果里不显示改字段信息,此处为隐藏用户密码信息
    User.findOne({ user, pwd:md5Pwd(pwd) }, _filter, (err, doc) => {
        if (err) {
            return res.json({ success: false, code: 1, message: err })
        } 
        if (!doc) {
            return res.json({ success: false, code: 1, message: '用户名或密码错误' })
        }
        res.cookie('userid', doc._id); 
        return res.json({ success: true, code: 0, data: doc });
    })
})

// 用户登录
Router.post('/update', (req, res) => {
    // 首先获取cookie
    const { userid } = req.cookies;
    // 如果没有cookie,则直接返回错误
    if (!userid) {
        return res.json({ success: false, code: 1, message: 'cookie数据不正确' });
    }
    const { body } = req;
    console.log('updete body',userid, body);
    User.findByIdAndUpdate(userid, body, (err, doc) => {
        console.log('updete doc',err, doc);
        if (err) {
            return res.json({ success: false, code: 1, message: err })
        } 
        if (!doc) {
            return res.json({ success: false, code: 1, message: '用户名或密码错误' })
        }
        // 合并一下数据,因为node不支持 ... 写法,此处使用Object.assign
        const data =  Object.assign({}, {
            user: doc.user,
            type: doc.type,
        }, body)
        console.log('data', data);
        return res.json({ success: true, code: 0, data })
    })
})

// 查询某一用户信息
Router.get('/info', (req, res) => {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ success: true, code: 1 })
    }
    User.findOne({ _id: userid }, _filter, (err, doc) => {
        if (err) {
            return res.json({ success: false, code: 1 })
        }
        if (!doc) {
            return res.json({ success: false, code: 1 })
        }
        return res.json({ success: true, code: 0, data: doc })
    })
})

function md5Pwd(pwd) {
    const salt = 'zmz_lovely_07252120_!@#$%_HGDKH_34754';
    return utils.md5(utils.md5(salt + pwd));
}

module.exports = Router;