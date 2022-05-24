var createError = require('http-errors')
var express = require('express')       // 引用express框架
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')       // 引入cors包
var logger = require('morgan')

var app = express()      // 创建网站服务器

// 解析表单数据application/x-www-form-urlencoded
// extended: true表示用qs模块来解析，false表示用原生的queryString模块来解析
app.use(bodyParser.urlencoded({ extended: false }))
// 解析post请求以json格式传递的参数 application/json
app.use(bodyParser.json())

// 配置跨域
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 引入路由模块
var indexRouter = require('./routes/index')
var goodRouter = require('./routes/good')
var personRouter = require('./routes/person')
// 注册路由
// indexRouter
app.use('/', indexRouter)
// 商品页
app.use(goodRouter)
// 人物页
app.use(personRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// app.listen(3000);      //  监听端口
module.exports = app
