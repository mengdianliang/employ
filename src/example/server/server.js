const express = require('express')
const mongoose = require('mongoose')
//链接mongo, 并且使用chat_info集合，没有会自动创建
const DB_URL = 'mongodb://localhost:27017/chat_info'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
    console.log('mongo connect success')
})
//类似mysql的表，mongo里有文档的概念
const User = mongoose.model('user', new mongoose.Schema({
    user: {'type': String, 'require': true},
    age: {'type': Number, 'require': true}
}))
// User.remove({age: 18}, function(err,doc){
//     console.log(doc)
// })
// User.create({
//     user: 'xian',
//     age: 10
// }, function(err, doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })
// 新建app
const app = express()

app.get('/', function(req, res){
    res.send('<h1>Hello World</h1>')
})
User.update({'user':'xianing'}, {'$set': {'age': 26}}, function(err, doc) {
    console.log(doc)
})
app.get('/data', function(req, res){
    // res.json({name: 'imooc react', type: 'IT'})
    // User.find({user: 'xianing'}, function(err, doc){
    //     res.json(doc)
    // })
    User.findOne({user: 'xianing'}, function(err, doc){
        res.json(doc)
    })
})
app.listen(9093, function() {
    console.log('Node app start at port 9093')
})