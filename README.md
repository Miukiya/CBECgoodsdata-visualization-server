# CBECgoodsdata-visualization-server
地方跨境电商通关商品数据可视化（毕设项目后台）  
目录结构  
|--api  							接口处理代码封装  
	|--goodApi  					goodUrl文件里需要调用的接口代码  
  |--personApi				personUrl文件里需要调用的接口代码  
|--bin							项目执行文件  
	|--www						port配置端口号 默认为3000  
|--mysql						数据库连接对象封装 向外共享  
	|--config					数据库连接配置信息  
|--node_modules			依赖库  
|--public						静态文件  
|--routes						路由文件封装 包含前端调用的Url和每个Url调用的接口函数  
	|--good						商品维度Url  
  |--person					企业与消费者Url  
|--views						视图代码  
|--app.js						主入口文件：创建网站服务器、注册路由、配置跨域等  
|--package.json			项目工程配置  
