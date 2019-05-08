# Webpack
webpack 介绍 & 安装 & 常用命令

##webpack系列目录

- webpack 系列 一：模块系统的演进
- webpack 系列 二：webpack 介绍&安装
- webpack 系列 三：webpack 如何集成第三方js库
- webpack 系列 四：webpack 多页面支持 & 公共组件单独打包
- webpack 系列 五：webpack Loaders 模块加载器
- webpack 系列 六：前端项目模板-webpack+gulp实现自动构建部署
- 本系列并非全部原创，如非原创，正文篇首会注明转载地址

基于webpack搭建纯静态页面型前端工程解决方案模板， 最终形态源码见[github]: (https://github.com/ifengkou/webpack-template)

##正文

本篇部分摘录于 webpack中文入门指南-模块系统 & webpack dev server

Webpack是一款用户打包前端模块的工具，它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。主要是用来打包在浏览器端使用的javascript的。同时也能转换、捆绑、打包其他的静态资源，包括css、image、font file、template等

[webpack的官网是](http://webpack.github.io/)   ，[文档地址是] (http://webpack.github.io/docs/)

###市面已存在大量的模块管理和打包工具，为什么还重复造轮子，webpack有什么特色？

####这些已有的模块化工具并不能很好的完成如下的目标：

+ 将依赖树拆分成按需加载的块
+ 初始化加载的耗时尽量少
+ 各种静态资源都可以视作模块
+ 将第三方库整合成模块的能力
+ 可以自定义打包逻辑的能力
+ 适合大项目，无论是单页还是多页的 Web 应用


##webpack 特点

1.代码拆分
Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。
Loader
Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。
2.智能解析
Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。
3.插件系统
Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。
快速运行
Webpack 使用异步 I/O 和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译。

总结下来其主要的优势：

按需加载模块，按需进行懒加载，在实际用到某些模块的时候再增量更新
webpack 是以 commonJS 的形式来书写脚本，但对 AMD/CMD 的支持也很全面，方便旧项目进行代码迁移。
能被模块化的不仅仅是 JS 了，能处理各种类型的资源。
开发便捷，能替代部分 grunt/gulp 的工作，比如打包、压缩混淆、图片转base64等。
扩展性强，插件机制完善
安装

首先要安装 Node.js， Node.js 自带了软件包管理器 npm
用npm 安装webpack

$ npm install webpack -g
1
此时 Webpack 已经安装到了全局环境下，可以通过命令行 webpack -h 查看相关指令

通常我们会将webpack安装到项目依赖，这样就可以使用本地版本的webpack

//进入项目目录
//确定已有package.json，没有就npm init 创建
$ npm install webpack --save-dev
 
//查看webpack 版本信息
$ npm info webpack
//安装指定版本
$ npm install webpack@1.31.x --save-dev
1
如果要使用webpack开发工具，要单独安装 webpack-dev-server

$ npm install webpack-dev-server --save-dev
1
常用命令

webpack

##构建命令，webpack的常用参数

 + $ webpack --config webpack.min.js //另一份配置文件
 
+ $ webpack --display-error-details //显示异常信息
 
+ $ webpack --watch   //监听变动并自动打包
 
+ $ webpack -p    //压缩混淆脚本，这个非常非常重要！
 
+ $ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
1
webpack-dev-server

webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。它还有一个通过Socket.IO连接着webpack-dev-server服务器的小型运行时程序。webpack-dev-server发送关于编译状态的消息到客户端，客户端根据消息作出响应。

webpack-dev-server有两种模式支持自动刷新——iframe模式和inline模式

在iframe模式下：页面是嵌套在一个iframe下的，在代码发生改动的时候，这个iframe会重新加载
在inline模式下：一个小型的webpack-dev-server客户端会作为入口文件打包，这个客户端会在后端代码改变的时候刷新页面
使用iframe模式，无需额外配置，只需在浏览器输入

(http://localhost:8080/webpack-dev-server/index.html)
1
使用inline模式有两种方式：命令行和nodejs API

命令行： 在运行时，加上 --inline 选项

$ webpack-dev-server --inline
1
访问，通过http://localhost:8080 就可以访问

nodejs API 方式 ，需要手动把 webpack-dev-server/client?http://localhost:8080 加到配置文件的入口文件处
