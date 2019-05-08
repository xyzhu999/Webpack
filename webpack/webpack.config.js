const htmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
    entry: "./src/index.js",
    // entry:{
    //     index1:"./src/index1",
    //     index2:"./src/index2",
    //     index3:"./src/index3"
    // },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }

        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            minify: {
                removeComments: true, //去除注释
                collapseWhitespace: true, //去除空格
                removeAttributeQuotes: true, //移除属性的引号
                removeEmptyAttributes: true, //去除空属性
            }
        }),
    ]
}