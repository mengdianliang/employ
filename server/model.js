const mongoose = require('mongoose')
//链接mongodb,并使用chat-info这个集合
const DB_URL = 'mongodb://localhost:27017/chat-info'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
    console.log('mongo connect success')
})

const models = {
    user: {
        'user': {
            'type': String,
            'require': true
        },
        'pwd': {
            'type': String,
            'require': true
        },
        'type': {
            'type': String,
            'require': true
        },
        //头像
        'avatar': {
            'type': String
        },
        //个人简介
        'desc': {
            'type': String
        },
        //职位名称
        'title': {
            'type': String
        },
        //Boss的字段
        'company': {
            'type': String
        },
        'money': {
            'type': String
        }
    },
    chat: {
        'chatid': {
            'type': String,
            'require': true
        },
        'from': {
            'type': String,
            'require': true
        },
        'to': {
            'type': String,
            'require': true
        },
        'read': {
            'type': Boolean,
            'default': false
        },
        'content': {
            'type': String,
            'require': true,
            'default': ''
        },
        'create_time': {
            'type': Number,
            'require': true
        }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
    getModel(name) {
        return mongoose.model(name)
    } 
}