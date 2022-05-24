var express = require('express')
var personRouter = express.Router()
// 引入 personApi 文件
var personApi = require('../api/personApi')

// 各个url接口调用对应的api方法
// 查询两性各年龄段人数
personRouter.post('/personAge', personApi.personAge)

// 查询各地物流清单数量
personRouter.post('/personLogisticsList', personApi.personLogisticsList)

// 查询各年商品前四及贡献货值前五企业
personRouter.post('/personCompanyGood', personApi.personCompanyGood)

// 查询商品——企业——注册时间 关系节点
personRouter.post('/personRelationNodes', personApi.personRelationNodes);

// 查询商品——企业——注册时间 关系
personRouter.post('/personRelationLinks', personApi.personRelationLinks);

module.exports = personRouter
