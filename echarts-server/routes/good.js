// 引入路由模块
var express = require('express')
var goodRouter = express.Router()
// 导入 goodApi 函数文件
var goodApi = require('../api/goodApi')

// 各个url接口调用对应的api方法
// 获取商品类 api
goodRouter.post('/getTypes', goodApi.getTypes)

// 查询单类商品数量
goodRouter.post('/singleGoodQuantity', goodApi.singleGoodQuantity)

// 查询多类商品数量
goodRouter.post('/moreGoodQuantity', goodApi.moreGoodQuantity)

// 查询单类商品货值
goodRouter.post('/singleGoodValue', goodApi.singleGoodValue)

// 查询单类商品货值排序
goodRouter.post('/singleGoodValueRank', goodApi.singleGoodValueRank)

// 查询多类商品货值
goodRouter.post('/moreGoodValue', goodApi.moreGoodValue)

// 查询多类商品货值排序
goodRouter.post('/moreGoodValueRank', goodApi.moreGoodValueRank)

// 查询多类商品各类数量
goodRouter.post('/moreGoodType', goodApi.moreGoodType)

// 查询单类商品各国进出口总额
goodRouter.post('/singleGoodWorldMap', goodApi.singleGoodWorldMap)

// 查询多类商品各国进出口总额
goodRouter.post('/moreGoodWorldMap', goodApi.moreGoodWorldMap)

// 查询商品词云
goodRouter.post('/goodWord', goodApi.goodWord)

// 查询单类商品单价（进出口模式）
goodRouter.post('/singleGoodPrice', goodApi.singleGoodPrice)

// 查询单类商品单价（国家）
goodRouter.post('/singleGoodCountryPrice', goodApi.singleGoodCountryPrice)

module.exports = goodRouter