var express = require('express');
var router = express.Router();

 /* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// 导出中间件
module.exports = router;