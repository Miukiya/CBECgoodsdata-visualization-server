// 导入数据库对象
var conn = require('../mysql/config')

// 获取商品类 api
var getTypes = function (req, res, next) {
    // 接收参数
    let { id } = req.body
    let sql = "select typesId.id from typesId where typesId.typeName = ?"
    conn.query(sql, [id], (err, result) => {
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

// 查询单类商品数量
var singleGoodQuantity = function (req, res, next) {
    // 接收参数
    let { id } = req.body
    // 定义sql
    let sql = "select typesId.typeName, goodquantity.year_2016, goodquantity.year_2017, goodquantity.year_2018, goodquantity.year_2019, goodquantity.year_2020, goodquantity.year_2021 from goodquantity inner join typesID on goodquantity.goodTypeId = typesId.id and typesID.typeName = ?"
    conn.query(sql, [id], (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let obj = data.list[0]
                let resultArr = []
                for (let i in obj) {
                    resultArr.push(obj[i])
                };
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
    // conn.end()          // 关闭连接
}

// 查询多类商品数量
var moreGoodQuantity = function (req, res, next) {
    // 接收参数
    let id = []
    let obj = req.body
    // obj 转换为 array
    for (var i in obj) {
        id.push(obj[i])
    }
    let string = ""
    for (let i = 0; i < id.length - 1; i++) {
        string += "?,"
    }
    // 定义sql
    let sql = "select typesId.typeName, goodquantity.year_2016, goodquantity.year_2017, goodquantity.year_2018, goodquantity.year_2019, goodquantity.year_2020, goodquantity.year_2021 from goodquantity inner join typesId on goodquantity.goodTypeId = typesId.id and typesID.typeName in"
    sql += "(" + string + "?" + ")"
    conn.query(sql, id, (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let sum = data.list.reduce((total, current) => {
                    if (!total) total = {}
                    Object.keys(current).forEach((key) => {
                        // 数值类型
                        if (typeof current[key] == 'number') {
                            total[key] = (total[key] ? total[key] : 0) + current[key]
                        }
                        // 字符串类型
                        if (typeof current[key] == 'string') {
                            total[key] = (total[key] ? total[key] : "") + "," + current[key]
                        }
                    })
                    return total
                })
                // 将返回结果转化为数组
                let resultArr = []
                for (let i in sum) {
                    resultArr.push(sum[i])
                };
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
    // conn.end()          // 关闭连接
}

// 查询单类商品货值
var singleGoodValue = function (req, res, next) {
    // 接收参数
    let { id } = req.body
    // 定义sql
    let sql = "select typesId.typeName, goodvalue.year_2016, goodvalue.year_2017, goodvalue.year_2018, goodvalue.year_2019, goodvalue.year_2020, goodvalue.year_2021 from goodvalue inner join typesId on goodvalue.goodTypeId = typesId.id and typesID.typeName = ?"
    conn.query(sql, [id], (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let obj = data.list[0]
                let resultArr = []
                for (let i in obj) {
                    resultArr.push(obj[i])
                };
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

// 查询单类商品货值排序
var singleGoodValueRank = function (req, res, next) {
    // 接收参数
    let { id } = req.body
    // 定义sql
    let sql = "select typesId.typeName, goodvalue_rank.rankyear, goodvalue_rank.goodname, goodvalue_rank.valuedata from goodvalue_rank inner join typesId on goodvalue_rank.categoryid = typesId.id and typesID.typeName = ?"
    conn.query(sql, [id], (err, result) => {
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
                let year_2016 = []
                let year_2017 = []
                let year_2018 = []
                let year_2019 = []
                let year_2020 = []
                let year_2021 = []
                // 查询该年份的商品名、商品货值
                data.list.map(item => {
                    if (item.rankyear == "2016") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2016.push(obj)
                    } else if (item.rankyear == "2017") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2017.push(obj)
                    } else if (item.rankyear == "2018") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2018.push(obj)
                    } else if (item.rankyear == "2019") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2019.push(obj)
                    } else if (item.rankyear == "2020") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2020.push(obj)
                    } else if (item.rankyear == "2021") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2021.push(obj)
                    }
                })
                // 对该年份商品按货值进行排序，并封装返回值
                year_2016 = year_2016
                    .sort((a, b) => a["value"] - b["value"])
                let rank_2016 = {}
                rank_2016.year = "2016"
                rank_2016.rank = year_2016
                resultArr.push(rank_2016)
                year_2017 = year_2017
                    .sort((a, b) => a["value"] - b["value"])
                let rank_2017 = {}
                rank_2017.year = "2017"
                rank_2017.rank = year_2017
                resultArr.push(rank_2017)
                year_2018 = year_2018
                    .sort((a, b) => a["value"] - b["value"])
                let rank_2018 = {}
                rank_2018.year = "2018"
                rank_2018.rank = year_2018
                resultArr.push(rank_2018)
                year_2019 = year_2019
                    .sort((a, b) => a["value"] - b["value"])
                let rank_2019 = {}
                rank_2019.year = "2019"
                rank_2019.rank = year_2019
                resultArr.push(rank_2019)
                year_2020 = year_2020
                    .sort((a, b) => a["value"] - b["value"])
                let rank_2020 = {}
                rank_2020.year = "2020"
                rank_2020.rank = year_2020
                resultArr.push(rank_2020)
                year_2021 = year_2021
                    .sort((a, b) => a["value"] - b["value"])
                let rank_2021 = {}
                rank_2021.year = "2021"
                rank_2021.rank = year_2021
                resultArr.push(rank_2021)
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

// 查询多类商品货值
var moreGoodValue = function (req, res, next) {
    // 接收参数
    let id = []
    let obj = req.body
    // obj 转换为 array
    for (var i in obj) {
        id.push(obj[i])
    }
    let string = ""
    for (let i = 0; i < id.length - 1; i++) {
        string += "?,"
    }
    // 定义sql
    let sql = "select typesId.typeName, goodvalue.year_2016, goodvalue.year_2017, goodvalue.year_2018, goodvalue.year_2019, goodvalue.year_2020, goodvalue.year_2021 from goodvalue inner join typesId on goodvalue.goodTypeId = typesId.id and typesID.typeName in"
    sql += "(" + string + "?" + ")"
    conn.query(sql, id, (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let sum = data.list.reduce((total, current) => {
                    if (!total) total = {}
                    Object.keys(current).forEach((key) => {
                        // 数值类型
                        if (typeof current[key] == 'number') {
                            total[key] = (total[key] ? total[key] : 0) + current[key]
                        }
                        // 字符串类型
                        if (typeof current[key] == 'string') {
                            total[key] = (total[key] ? total[key] : "") + "," + current[key]
                        }
                    })
                    return total
                })
                // 将返回结果转化为数组
                let resultArr = []
                for (let i in sum) {
                    resultArr.push(sum[i])
                };
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
    // conn.end()          // 关闭连接
}

// 查询多类商品货值排序
var moreGoodValueRank = function (req, res, next) {
    // 接收参数
    let id = []
    let obj = req.body
    // obj 转换为 array
    for (var i in obj) {
        id.push(obj[i])
    }
    let string = ""
    for (let i = 0; i < id.length - 1; i++) {
        string += "?,"
    }
    let sql = "select typesId.typeName, goodvalue_rank.rankyear, goodvalue_rank.goodname, goodvalue_rank.valuedata from goodvalue_rank inner join typesId on goodvalue_rank.categoryid = typesId.id and typesID.typeName in"
    sql += "(" + string + "?" + ")"
    conn.query(sql, id, (err, result) => {
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
                let year_2016 = []
                let year_2017 = []
                let year_2018 = []
                let year_2019 = []
                let year_2020 = []
                let year_2021 = []
                // 查询该年份的商品名、商品货值
                data.list.map(item => {
                    if (item.rankyear == "2016") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2016.push(obj)
                    } else if (item.rankyear == "2017") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2017.push(obj)
                    } else if (item.rankyear == "2018") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2018.push(obj)
                    } else if (item.rankyear == "2019") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2019.push(obj)
                    } else if (item.rankyear == "2020") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2020.push(obj)
                    } else if (item.rankyear == "2021") {
                        let obj = {}
                        obj.name = item.goodname
                        obj.value = item.valuedata
                        year_2021.push(obj)
                    }
                })
                // 对该年份商品按货值进行排序，并封装返回值
                let start = (id.length - 1) * 10
                year_2016 = year_2016
                    .sort((a, b) => a["value"] - b["value"])
                    .slice(start)
                let rank_2016 = {}
                rank_2016.year = "2016"
                rank_2016.rank = year_2016
                resultArr.push(rank_2016)
                year_2017 = year_2017
                    .sort((a, b) => a["value"] - b["value"])
                    .slice(start)
                let rank_2017 = {}
                rank_2017.year = "2017"
                rank_2017.rank = year_2017
                resultArr.push(rank_2017)
                year_2018 = year_2018
                    .sort((a, b) => a["value"] - b["value"])
                    .slice(start)
                let rank_2018 = {}
                rank_2018.year = "2018"
                rank_2018.rank = year_2018
                resultArr.push(rank_2018)
                year_2019 = year_2019
                    .sort((a, b) => a["value"] - b["value"])
                    .slice(start)
                let rank_2019 = {}
                rank_2019.year = "2019"
                rank_2019.rank = year_2019
                resultArr.push(rank_2019)
                year_2020 = year_2020
                    .sort((a, b) => a["value"] - b["value"])
                    .slice(start)
                let rank_2020 = {}
                rank_2020.year = "2020"
                rank_2020.rank = year_2020
                resultArr.push(rank_2020)
                year_2021 = year_2021
                    .sort((a, b) => a["value"] - b["value"])
                    .slice(start)
                let rank_2021 = {}
                rank_2021.year = "2021"
                rank_2021.rank = year_2021
                resultArr.push(rank_2021)
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

// 查询多类商品各类数量
var moreGoodType = function (req, res, next) {
    // 接收参数
    let id = []
    let obj = req.body
    // obj 转换为 array
    for (var i in obj) {
        id.push(obj[i])
    }
    let string = ""
    for (let i = 0; i < id.length - 1; i++) {
        string += "?,"
    }
    // 定义sql
    let sql = "select typesId.typeName, goodquantity.year_2016, goodquantity.year_2017, goodquantity.year_2018, goodquantity.year_2019, goodquantity.year_2020, goodquantity.year_2021 from goodquantity inner join typesId on goodquantity.goodTypeId = typesId.id and typesID.typeName in"
    sql += "(" + string + "?" + ")"
    conn.query(sql, id, (err, result) => {
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
                let year = ["year", "2016", "2017", "2018", "2019", "2020", "2021"]
                resultArr.push(year)
                for (let i = 0; i < data.list.length; i++) {
                    let obj = data.list[i]
                    let typeArr = []
                    for (let j in obj) {
                        typeArr.push(obj[j])
                    }
                    resultArr.push(typeArr)
                }
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

// 查询单类商品各国进出口总额
var singleGoodWorldMap = function (req, res, next) {
    // 接收参数
    let { id } = req.body
    // 定义sql
    let sql = "select typesId.typeName, goodworldmap.countryName, goodworldmap.valuedata from goodworldmap inner join typesID on goodworldmap.categoryid = typesId.id and typesID.typeName = ?"
    // 执行数据库操作语句
    conn.query(sql, [id], (err, result) => {
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
                let startCoord = { coordsName: ["成都", "成都", 5000] }
                resultArr.push(startCoord)
                data.list.map(item => {
                    let coordObj = {}
                    let path_value = ["成都"]
                    path_value.push(item.countryName)
                    path_value.push(item.valuedata)
                    coordObj.coordsName = path_value
                    resultArr.push(coordObj)
                })
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

// 查询多类商品各国进出口总额
var moreGoodWorldMap = function (req, res, next) {
    // 接收参数
    let id = []
    let obj = req.body
    // obj 转换为 array
    for (var i in obj) {
        id.push(obj[i])
    }
    let string = ""
    for (let i = 0; i < id.length - 1; i++) {
        string += "?,"
    }
    // 定义sql
    let sql = "select typesId.typeName, goodworldmap.countryName, goodworldmap.valuedata from goodworldmap inner join typesID on goodworldmap.categoryid = typesId.id and typesID.typeName in"
    sql += "(" + string + "?" + ")"
    conn.query(sql, id, (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let country_arr = []
                let value_sum = []
                let resultArr = []
                let startCoord = { coordsName: ["成都", "成都", 5000] }
                resultArr.push(startCoord)
                data.list.map(item => {
                    let countryObj1 = {}
                    let countryObj2 = {}
                    countryObj1.countryName = item.countryName
                    countryObj1.value = item.valuedata
                    country_arr.push(countryObj1)
                    countryObj2.name = item.countryName
                    countryObj2.data = 0
                    value_sum.push(countryObj2)
                })
                // 去重
                let obj = {}
                value_sum = value_sum.reduce((arr, item) => {
                    obj[item.name] ? "" : (obj[item.name] = true && arr.push(item))
                    return arr
                }, [])
                // 计算同个国家多类商品总额
                country_arr.filter(item1 => {
                    value_sum.map(item2 => {
                        if (item1.countryName === item2.name) {
                            item2.data += item1.value
                        }
                    })
                })
                value_sum.map(item => {
                    let coordObj = {}
                    coordObj.coordsName = ["成都"]
                    coordObj.coordsName.push(item.name)
                    coordObj.coordsName.push(item.data)
                    resultArr.push(coordObj)
                })
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

// 查询商品词云
var goodWord = function (req, res, next) {
    // 接收参数
    let id = []
    let obj = req.body
    // obj 转换为 array
    for (var i in obj) {
        id.push(obj[i])
    }
    let string = ""
    for (let i = 0; i < id.length - 1; i++) {
        string += "?,"
    }
    // 定义sql
    let sql = "select typesId.typeName, goodquantity.year_2016, goodquantity.year_2017, goodquantity.year_2018, goodquantity.year_2019, goodquantity.year_2020, goodquantity.year_2021 from goodquantity inner join typesID on goodquantity.goodTypeId = typesId.id and typesID.typeName in"
    sql += "(" + string + "?" + ")"
    conn.query(sql, id, (err, result) => {
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
                data.list.map(item => {
                    let obj = {}
                    obj.name = item.typeName
                    obj.value = 0
                    Object.keys(item).forEach(key => {
                        if (typeof item[key] === "number") {
                            obj.value += item[key]
                        }
                    })
                    resultArr.push(obj)
                })
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

// 查询单类商品单价（进出口模式）
var singleGoodPrice = function (req, res, next) {
    // 接收参数
    let { id } = req.body
    // 定义sql
    let sql = "select typesId.typeName, goodprice.modeName, goodprice.year_2016, goodprice.year_2017, goodprice.year_2018, goodprice.year_2019, goodprice.year_2020, goodprice.year_2021 from goodprice inner join typesID on goodprice.goodTypeId = typesId.id and typesID.typeName = ?"
    conn.query(sql, [id], (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let dataset1 = []
                let obj = {}
                data.list.map(item => {
                    if (item.modeName === "直邮境内") {
                        let dataLine1 = []
                        Object.keys(item).forEach(key => {
                            if (typeof item[key] === "number") {
                                dataLine1.push(item[key])
                            }
                        })
                        obj.dataLine1 = dataLine1
                    } else if (item.modeName === "保税") {
                        let dataLine2 = []
                        Object.keys(item).forEach(key => {
                            if (typeof item[key] === "number") {
                                dataLine2.push(item[key])
                            }
                        })
                        obj.dataLine2 = dataLine2
                    } else if (item.modeName === "一般出口") {
                        let dataLine3 = []
                        Object.keys(item).forEach(key => {
                            if (typeof item[key] === "number") {
                                dataLine3.push(item[key])
                            }
                        })
                        obj.dataLine3 = dataLine3
                    } else if (item.modeName === "海外仓") {
                        let dataLine4 = []
                        Object.keys(item).forEach(key => {
                            if (typeof item[key] === "number") {
                                dataLine4.push(item[key])
                            }
                        })
                        obj.dataLine4 = dataLine4
                    }
                })
                obj.year = ["2016", "2017", "2018", "2019", "2020", "2021"]
                dataset1.push({ source: obj })
                let resultArr = dataset1
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

// 查询单类商品单价（国家）
var singleGoodCountryPrice = function (req, res, next) {
    // 接收参数
    let { id } = req.body
    // 定义sql
    let sql = "select typesId.typeName, goodprice_country.time_year, goodprice_country.type, goodprice_country.countryName, goodprice_country.price from goodprice_country inner join typesID on goodprice_country.categoryid = typesId.id and typesID.typeName = ?"
    conn.query(sql, [id], (err, result) => {
        if (err) {
            console.log('查询数据库失败！')
        } else {
            let data
            if (result.length) {
                data = {
                    code: 0,
                    list: result
                }
                let dataset2 = []
                // 2016-2021
                let source_all = {}
                let countryImp_all = []
                let priceImp_all = []
                let countryExp_all = []
                let priceExp_all = []
                // 2016
                let source_2016 = {}
                let countryImp_2016 = []
                let priceImp_2016 = []
                let countryExp_2016 = []
                let priceExp_2016 = []
                // 2017
                let source_2017 = {}
                let countryImp_2017 = []
                let priceImp_2017 = []
                let countryExp_2017 = []
                let priceExp_2017 = []
                // 2018
                let source_2018 = {}
                let countryImp_2018 = []
                let priceImp_2018 = []
                let countryExp_2018 = []
                let priceExp_2018 = []
                // 2019
                let source_2019 = {}
                let countryImp_2019 = []
                let priceImp_2019 = []
                let countryExp_2019 = []
                let priceExp_2019 = []
                // 2020
                let source_2020 = {}
                let countryImp_2020 = []
                let priceImp_2020 = []
                let countryExp_2020 = []
                let priceExp_2020 = []
                // 2021
                let source_2021 = {}
                let countryImp_2021 = []
                let priceImp_2021 = []
                let countryExp_2021 = []
                let priceExp_2021 = []
                data.list.map(item => {
                    if (item.time_year === "0000") {
                        if (item.type === "原产国/地区") {
                            countryImp_all.push(item.countryName)
                            priceImp_all.push(item.price)
                        } else if (item.type === "出口国/地区") {
                            countryExp_all.push(item.countryName)
                            priceExp_all.push(item.price)
                        }
                    } else if (item.time_year === 2016) {
                        if (item.type === "原产国/地区") {
                            countryImp_2016.push(item.countryName)
                            priceImp_2016.push(item.price)
                        } else if (item.type === "出口国/地区") {
                            countryExp_2016.push(item.countryName)
                            priceExp_2016.push(item.price)
                        }
                    } else if (item.time_year === 2017) {
                        if (item.type === "原产国/地区") {
                            countryImp_2017.push(item.countryName)
                            priceImp_2017.push(item.price)
                        } else if (item.type === "出口国/地区") {
                            countryExp_2017.push(item.countryName)
                            priceExp_2017.push(item.price)
                        }
                    } else if (item.time_year === 2018) {
                        if (item.type === "原产国/地区") {
                            countryImp_2018.push(item.countryName)
                            priceImp_2018.push(item.price)
                        } else if (item.type === "出口国/地区") {
                            countryExp_2018.push(item.countryName)
                            priceExp_2018.push(item.price)
                        }
                    } else if (item.time_year === 2019) {
                        if (item.type === "原产国/地区") {
                            countryImp_2019.push(item.countryName)
                            priceImp_2019.push(item.price)
                        } else if (item.type === "出口国/地区") {
                            countryExp_2019.push(item.countryName)
                            priceExp_2019.push(item.price)
                        }
                    } else if (item.time_year === 2020) {
                        if (item.type === "原产国/地区") {
                            countryImp_2020.push(item.countryName)
                            priceImp_2020.push(item.price)
                        } else if (item.type === "出口国/地区") {
                            countryExp_2020.push(item.countryName)
                            priceExp_2020.push(item.price)
                        }
                    } else if (item.time_year === 2021) {
                        if (item.type === "原产国/地区") {
                            countryImp_2021.push(item.countryName)
                            priceImp_2021.push(item.price)
                        } else if (item.type === "出口国/地区") {
                            countryExp_2021.push(item.countryName)
                            priceExp_2021.push(item.price)
                        }
                    }
                })
                // 0000
                source_all.countryImp = countryImp_all
                source_all.priceImp = priceImp_all
                source_all.countryExp = countryExp_all
                source_all.priceExp = priceExp_all
                dataset2.push({ source: source_all })
                // 2016
                source_2016.countryImp = countryImp_2016
                source_2016.priceImp = priceImp_2016
                source_2016.countryExp = countryExp_2016
                source_2016.priceExp = priceExp_2016
                dataset2.push({ source: source_2016 })
                // 2017
                source_2017.countryImp = countryImp_2017
                source_2017.priceImp = priceImp_2017
                source_2017.countryExp = countryExp_2017
                source_2017.priceExp = priceExp_2017
                dataset2.push({ source: source_2017 })
                // 2018
                source_2018.countryImp = countryImp_2018
                source_2018.priceImp = priceImp_2018
                source_2018.countryExp = countryExp_2018
                source_2018.priceExp = priceExp_2018
                dataset2.push({ source: source_2018 })
                // 2019
                source_2019.countryImp = countryImp_2019
                source_2019.priceImp = priceImp_2019
                source_2019.countryExp = countryExp_2019
                source_2019.priceExp = priceExp_2019
                dataset2.push({ source: source_2019 })
                // 2020
                source_2020.countryImp = countryImp_2020
                source_2020.priceImp = priceImp_2020
                source_2020.countryExp = countryExp_2020
                source_2020.priceExp = priceExp_2020
                dataset2.push({ source: source_2020 })
                // 2021
                source_2021.countryImp = countryImp_2021
                source_2021.priceImp = priceImp_2021
                source_2021.countryExp = countryExp_2021
                source_2021.priceExp = priceExp_2021
                dataset2.push({ source: source_2021 })
                let resultArr = dataset2
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

module.exports = {
    getTypes,
    singleGoodQuantity,
    moreGoodQuantity,
    singleGoodValue,
    singleGoodValueRank,
    moreGoodValue,
    moreGoodValueRank,
    moreGoodType,
    singleGoodWorldMap,
    moreGoodWorldMap,
    goodWord,
    singleGoodPrice,
    singleGoodCountryPrice
}