const express = require('express')
const Router = express.Router()

const utils = require('utility') //MD5加密

const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat') 

//过滤显示的信息
const _filter = {
    'pwd': 0,
     '__v': 0
}
// Chat.remove({},function(e, d){

// })
// 用户注册
Router.post('/register', function(req, res) {
    console.log(req.body)
    const {user, pwd, type} = req.body
    User.findOne({user:user}, function(err,doc) {
        if (doc) {
            return res.json({
                code: 1, 
                msg: '用户名重复！'
            })
        }
        //这里使用存入create()方法不能获取自动生成的id，使用save()方法
        const userModel = new User({user, pwd: md5Pwd(pwd), type})
        userModel.save(function(e, d) {
            if (e) {
                return read.json({
                    code: 1, 
                    msg: '后端出错了！'
                })
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({
                code: 0,
                data: {user, type, _id}
            })
        })
    })
})
// 用户登录
Router.post('/login', function(req, res) {
    console.log(req.body)
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err,doc) {
        if (!doc) {
            return res.json({
                code: 1, 
                msg: '用户名或密码错误！'
            })
        }
        res.cookie('userid', doc._id)
        return res.json({
            code: 0, 
            data: doc
        })
    })
})
// 用户详情
Router.get('/info', function(req, res) {
    // 读取cookie
    const {userid} = req.cookies
    // 用户没有cookie
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function( err, doc) {
        if (err) {
            return res.json({
                code: 1,
                msg: '后端出错了'
            })
        }
        return res.json({
            code: 0,
            data: doc
        })
    })
})
//完善用户信息
Router.post('/update', function(req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        //解析编码的json
        return json.dumps({code: 1})
    }
    const body = req.body
    // console.log(body)
    // 查找并更新 （查找的id, 修改的数据）
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        },body)
        return res.json({code: 0, data}) 
    })
})
//md5加密
function md5Pwd(pwd) {
    const salt = 'chat_is_good_3957x8were6@#2#$$%'
    return utils.md5(utils.md5(pwd + salt))
}
//获取用户列表
Router.get('/list', function(req, res) {
    const {type} = req.query
    // User.remove({}, function(e, d) {})
    User.find({type}, function(err, doc) {
        return res.json({
            code: 0,
            data: doc
        })
    })
})

// 获取信息列表
Router.get('/getmsglist', function(req, res) {
    const user = req.cookies.userid
    User.find({}, function(e, userdoc) {
        let users = {}
        userdoc.forEach(v=>{
            users[v._id] = {
                name: v.user, 
                avatar: v.avatar
            }
        })
        // {"$or":[{"from": user}, {"to": user}]}
        Chat.find({"$or":[{"from": user}, {"to": user}]}, function(err, doc) {
            //console.log(doc)
            if (!err) {
                return res.json({
                    code: 0, 
                    msgs: doc, 
                    users: users
                })
            }
        })
    })
})

//读取信息
Router.post('/readmsg', function(req, res) {
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update(
        {from, 'to': userid}, 
        {'$set': {'read': true}}, 
        {'multi': true},  //可以一次修改多条数据
        function(err, doc){
        // console.log(doc)
        if (!err) {
            return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1, msg: "修改失败"})
    })

})
module.exports = Router