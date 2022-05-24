// 导入数据库对象
var conn = require('../mysql/config')

// 查询两性各年龄段人数
var personAge = function (req, res, next) {
    let sql = "select person_age.value, consumer_number.type, consumer_number.number from consumer_number inner join person_age on consumer_number.ageCode = person_age.ageId"
    conn.query(sql, (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let resultArr = []
                let maleData = []
                let femaleData = []
                data.list.map(item => {
                    if (item.type === "男") {
                        maleData.push(item.number)
                    } else if (item.type === "女") {
                        femaleData.push(item.number)
                    }
                })
                resultArr.push({ male: maleData })
                resultArr.push({ female: femaleData })
                res.send(resultArr)
            } else {
                data = {
                    code: 1,
                    msg: '没有结果！'
                }
                res.send(data.msg)
            }
        }
    })
}

// 查询各地物流清单数量
var personLogisticsList = function (req, res, next) {
    let sql = "select * from logisticsList_number"
    conn.query(sql, (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let effect_data = []
                data.list.map(item => {
                    if (item.name !== '该地址无效！') {
                        effect_data.push(item)
                    }
                })
                let resultArr = effect_data
                res.send(resultArr)
            } else {
                data = {
                    code: 1,
                    msg: '没有结果！'
                }
                res.send(data.msg)
            }
        }
    })
}

// 查询各年商品前四及贡献货值前五企业
var personCompanyGood = function (req, res, next) {
    let sql = "select * from person_companygood"
    conn.query(sql, (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let resultArr = []
                // 2016
                let gc_2016 = []    // 2016年 所有值
                let goods_2016 = [] // 2016年 商品名
                let company_good1_2016 = [] // 2016年 商品1 企业名
                let company_good2_2016 = [] // 2016年 商品2 企业名
                let company_good3_2016 = [] // 2016年 商品3 企业名
                let company_good4_2016 = [] // 2016年 商品4 企业名
                // 2017
                let gc_2017 = []
                let goods_2017 = []
                let company_good1_2017 = []
                let company_good2_2017 = []
                let company_good3_2017 = []
                let company_good4_2017 = []
                // 2018
                let gc_2018 = []
                let goods_2018 = []
                let company_good1_2018 = []
                let company_good2_2018 = []
                let company_good3_2018 = []
                let company_good4_2018 = []
                // 2019
                let gc_2019 = []
                let goods_2019 = []
                let company_good1_2019 = []
                let company_good2_2019 = []
                let company_good3_2019 = []
                let company_good4_2019 = []
                // 2020
                let gc_2020 = []
                let goods_2020 = []
                let company_good1_2020 = []
                let company_good2_2020 = []
                let company_good3_2020 = []
                let company_good4_2020 = []
                // 2021
                let gc_2021 = []
                let goods_2021 = []
                let company_good1_2021 = []
                let company_good2_2021 = []
                let company_good3_2021 = []
                let company_good4_2021 = []
                // 获取商品名
                data.list.map(item => {
                    if (item.time === 2016) {
                        gc_2016.push(item)
                        goods_2016.push(item.goodName)
                    } else if (item.time === 2017) {
                        gc_2017.push(item)
                        goods_2017.push(item.goodName)
                    } else if (item.time === 2018) {
                        gc_2018.push(item)
                        goods_2018.push(item.goodName)
                    } else if (item.time === 2019) {
                        gc_2019.push(item)
                        goods_2019.push(item.goodName)
                    } else if (item.time === 2020) {
                        gc_2020.push(item)
                        goods_2020.push(item.goodName)
                    } else if (item.time === 2021) {
                        gc_2021.push(item)
                        goods_2021.push(item.goodName)
                    }
                })
                // 去重
                goods_2016 = Array.from(new Set(goods_2016))
                goods_2017 = Array.from(new Set(goods_2017))
                goods_2018 = Array.from(new Set(goods_2018))
                goods_2019 = Array.from(new Set(goods_2019))
                goods_2020 = Array.from(new Set(goods_2020))
                goods_2021 = Array.from(new Set(goods_2021))
                // 2016获取企业名
                gc_2016.map(item => {
                    if (item.goodName === goods_2016[0]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good1_2016.push(obj)
                    } else if (item.goodName === goods_2016[1]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good2_2016.push(obj)
                    } else if (item.goodName === goods_2016[2]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good3_2016.push(obj)
                    } else if (item.goodName === goods_2016[3]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good4_2016.push(obj)
                    }
                })
                // 2017获取企业名
                gc_2017.map(item => {
                    if (item.goodName === goods_2017[0]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good1_2017.push(obj)
                    } else if (item.goodName === goods_2017[1]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good2_2017.push(obj)
                    } else if (item.goodName === goods_2017[2]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good3_2017.push(obj)
                    } else if (item.goodName === goods_2017[3]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good4_2017.push(obj)
                    }
                })
                // 2018获取企业名
                gc_2018.map(item => {
                    if (item.goodName === goods_2018[0]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good1_2018.push(obj)
                    } else if (item.goodName === goods_2018[1]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good2_2018.push(obj)
                    } else if (item.goodName === goods_2018[2]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good3_2018.push(obj)
                    } else if (item.goodName === goods_2018[3]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good4_2018.push(obj)
                    }
                })
                // 2019获取企业名
                gc_2019.map(item => {
                    if (item.goodName === goods_2019[0]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good1_2019.push(obj)
                    } else if (item.goodName === goods_2019[1]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good2_2019.push(obj)
                    } else if (item.goodName === goods_2019[2]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good3_2019.push(obj)
                    } else if (item.goodName === goods_2019[3]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good4_2019.push(obj)
                    }
                })
                // 2020获取企业名
                gc_2020.map(item => {
                    if (item.goodName === goods_2020[0]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good1_2020.push(obj)
                    } else if (item.goodName === goods_2020[1]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good2_2020.push(obj)
                    } else if (item.goodName === goods_2020[2]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good3_2020.push(obj)
                    } else if (item.goodName === goods_2020[3]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good4_2020.push(obj)
                    }
                })
                // 2021获取企业名
                gc_2021.map(item => {
                    if (item.goodName === goods_2021[0]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good1_2021.push(obj)
                    } else if (item.goodName === goods_2021[1]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good2_2021.push(obj)
                    } else if (item.goodName === goods_2021[2]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good3_2021.push(obj)
                    } else if (item.goodName === goods_2021[3]) {
                        let obj = {}
                        obj.name = item.companyName
                        obj.value = item.valuedata
                        company_good4_2021.push(obj)
                    }
                })
                // 2016年对象
                let obj_2016 = {
                    goods_2016: goods_2016,
                    company_good1_2016: company_good1_2016,
                    company_good2_2016: company_good2_2016,
                    company_good3_2016: company_good3_2016,
                    company_good4_2016: company_good4_2016
                }
                resultArr.push({ year_2016: obj_2016 })
                // 2017年对象
                let obj_2017 = {
                    goods_2017: goods_2017,
                    company_good1_2017: company_good1_2017,
                    company_good2_2017: company_good2_2017,
                    company_good3_2017: company_good3_2017,
                    company_good4_2017: company_good4_2017
                }
                resultArr.push({ year_2017: obj_2017 })
                // 2018年对象
                let obj_2018 = {
                    goods_2018: goods_2018,
                    company_good1_2018: company_good1_2018,
                    company_good2_2018: company_good2_2018,
                    company_good3_2018: company_good3_2018,
                    company_good4_2018: company_good4_2018
                }
                resultArr.push({ year_2018: obj_2018 })
                // 2019年对象
                let obj_2019 = {
                    goods_2019: goods_2019,
                    company_good1_2019: company_good1_2019,
                    company_good2_2019: company_good2_2019,
                    company_good3_2019: company_good3_2019,
                    company_good4_2019: company_good4_2019
                }
                resultArr.push({ year_2019: obj_2019 })
                // 2020年对象
                let obj_2020 = {
                    goods_2020: goods_2020,
                    company_good1_2020: company_good1_2020,
                    company_good2_2020: company_good2_2020,
                    company_good3_2020: company_good3_2020,
                    company_good4_2020: company_good4_2020
                }
                resultArr.push({ year_2020: obj_2020 })
                // 2021年对象
                let obj_2021 = {
                    goods_2021: goods_2021,
                    company_good1_2021: company_good1_2021,
                    company_good2_2021: company_good2_2021,
                    company_good3_2021: company_good3_2021,
                    company_good4_2021: company_good4_2021
                }
                resultArr.push({ year_2021: obj_2021 })
                res.send(resultArr)
            } else {
                data = {
                    code: 1,
                    msg: '没有结果！'
                }
                res.send(data.msg)
            }
        }
    })
}

// 查询商品——企业——注册时间 关系节点
var personRelationNodes = function (req, res, next) {
    let sql = "select * from relation_node"
    conn.query(sql, (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                res.send(data.list)
            } else {
                data = {
                    code: 1,
                    msg: '没有结果！'
                }
                res.send(data.msg)
            }
        }
    })
}

// 查询商品——企业——注册时间 关系
var personRelationLinks = function (req, res, next) {
    let sql = "select * from relation_link"
    conn.query(sql, (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                res.send(data.list)
            } else {
                data = {
                    code: 1,
                    msg: '没有结果！'
                }
                res.send(data.msg)
            }
        }
    })
}

module.exports = {
    personAge,
    personLogisticsList,
    personCompanyGood,
    personRelationNodes,
    personRelationLinks
}