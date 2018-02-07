# employ

--------
### 概述
项目是基于react.js，成品是一个移动端的招聘网站。
#### 模块划分
> 
* [x] 用户登陆注册
* [x] 用户信息完善
* [x] 应聘者和被应聘者列表
* [x] 应聘者和被应聘者对话列表
* [x] 应聘者和被应聘者最新消息列表
* [x] 个人中心
#### 技术栈
> 
*  React
*  react-app
*  react-router-dom
*  redux
*  Axios
*  Node
*  Mongodb
*  antd-mobile
*  Ant Motion
#### src目录结构(因为这里有一些测试的例子也放在这里，所以我把项目文件放在了Pro下)
* components: 存放一些基础组件
* containers: 存放一些视图组件
* resources: 存放图片，文字，样式
* redux: 状态管理
* router: 配置路由
* app.js：视图入口

#### server目录结构
* models.js: 数据库模型
* user.js: 业务逻辑处理
* server.js: 服务端入口文件

#### 好用的插件
* 队列动画
  ``` bash
  npm install rc-queue-anim -S
  import QueueAnim from 'rc-queue-anim'
  网址：https://motion.ant.design/api/queue-anim
  ```
* `socket.io即时通信
  ``` 
  npm install socket.io --save
  github网址：https://github.com/socketio/socket.io
  var server = require('http').createServer();
  var io = require('socket.io')(server);
  io.on('connection', function(client){
    client.on('event', function(data){});
    client.on('disconnect', function(){});
  });
  server.listen(3000);
  ```
* 加密插件utility
  ``` bash
  npm install utility
  https://github.com/node-modules/utility
  utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481');
  utils.md5(new Buffer('苏千')).should.equal('5f733c47c58a077d61257102b2d44481');
  // md5 base64 format
  utils.md5('苏千', 'base64'); // 'X3M8R8WKB31hJXECstREgQ=='

  // Object md5 hash. Sorted by key, and JSON.stringify. See source code for detail
  utils.md5({foo: 'bar', bar: 'foo'}).should.equal(utils.md5({bar: 'foo', foo: 'bar'}));
  ```
### Node知识点
由于node学的不是很好，所以这里总结一下感觉比较特别的一些基础知识。
#### 数据库
```
显示数据库列表 show dbs
创建一个demo数据库 use demo
创建数据库表：db.createCollection("user")

创建数据库集合并插入数据:
db.users.insert({id: 123, name: "张三"})
查看数据库集合：show collections
删除数据库: db.dropDatabase()
删除集合: db.user.drop() 

插入数据：db.user.insert({id: 123, username: 'jack', age: 20, class: {name: 'imooc', num: 10}})
查询数据并格式化：db.user.find().pretty()
查询第一条数据：db.user.findOne()
条件查询：db.user.find({'username': 'jack'})
          db.user.find({'age': {$gt: 20}})		
更新数据：db.user.update({username: "jack"}, {$set: {age: 30}})
更新子数据：db.user.update({username: "jack"}, {$set: {'class.name': 'imooc-jack'}})

删除数据：db.user.remove({id: 123})

导入文件数据：mongoimport -d db_demo -c users --file E:/代码/project/v18dyy/resource/dumall-users
```
* 删除购物车商品
```
router.post('/cartDel', function (req, res, next) {
  var userId = req.cookies.userId
  var productId = req.body.productId
  // $pull 要删除的数据
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  },function (err, doc) {
    if (err) {
      res.json({
        code: 1,
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        code: 0,
        msg: '',
        result: 'suc'
      })
    }
  })
})
```
* 修改购物车商品数量
```
router.post("/cartEdit", function (req, res, next) {
  var userId = req.cookies.userId
  var productId = req.body.productId
  var productNum = req.body.productNum
  var checked = req.body.checked

  // 更新子文档
  User.update({"userId": userId, "cartList.productId": productId}, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked,
    }, function (err,doc) {
    if (err) {
      res.json({
        code: 1,
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        code: 0,
        msg: '',
        result: 'suc'
      })
    }
  })
})
```

### 交互体验
该项目使用纯手写css样式，采用响应式布局，使用transition效果。使用到了分页加载插件`vue-infinite-scroll`，做到了下拉加载效果。

通过原生js实现的进度条效果，详情请看https://github.com/mengdianliang/shopping/blob/master/src/components/progress/progress.vue

为了减少流量，图片加载使用了懒加载的方式，滚动时再加载真实的图片。

### 效果
![](https://github.com/mengdianliang/shopping/blob/master/show/goodlist.png)
![](https://github.com/mengdianliang/shopping/blob/master/show/cart.png)
![](https://github.com/mengdianliang/shopping/blob/master/show/address.png)
![](https://github.com/mengdianliang/shopping/blob/master/show/order.png)
### 构建
#### 开发环境

``` bash
# install dependencies
npm install
# start server
node server/server.js
# serve with hot reload at localhost:3000
npm start
```
### 总结
通过学习该项目，对node又有了新的认识。虽然也有许多获取数据失败的问题，最多的还是node知识不扎实造成的，希望以后再node上多下点功夫。摁，加油！




