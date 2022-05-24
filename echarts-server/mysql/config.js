// 导入mysql模块
var mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'goodsview_public',
    port: '3306'
});

// 向外共享数据库连接对象
module.exports = db;