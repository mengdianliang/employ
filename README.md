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
* socket.io即时通信
  ``` bash
  npm install socket.io --save
  github网址：https://github.com/socketio/socket.io
  ```
* 加密插件utility
  ``` bash
  npm install utility -S
  github网址：https://github.com/node-modules/utility
  ```
### 重点

#### redux
```
在处理消息的时候，需要把消息划分为发消息跟收消息，同时发送消息（getMsgList(),readMsg(),sendMsg(),recvMsg()），要改变收消息的数量，并保存到数据库这里。
后台需要socket.io来实时监听消息,同时把消息分类处理，返回给客户端：
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

```
#### 解决路由跳转到相同路径问题
```
{(this.props.redirectTo&&this.props.redirectTo!=='/login') ? <Redirect to={this.props.redirectTo} /> : null}

```
#### 设置页面头信息
```
  <Helmet>
      {/* <link rel="icon" href={require('./pro/resource/images/favicon.ico')} type="image/x-icon" />
      <link rel="shortcut icon" href={require('./pro/resource/images/favicon.ico')} type="image/x-icon" /> */}
      <title>BOSS直聘</title>
  </Helmet>

```

### 交互体验
该项目使用ant-mobile ui组件，大大简化了我们手写样式结构的麻烦，同时用到了ant motion中的队列动画，更友好的用户体验。

还是用了axios拦截器的使用，有了loading加载体验

这里还用到了emoji表情，可以再发送消息时发送表情

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
通过学习该项目，学到了很多知识。redux对数据的处理加工还有待提升。加油！




