const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path');

module.exports ={
	entry: __dirname +'/app/index.js',//path.resolve是nodeJs里面方法，可以连接两个相对路径并生成绝对路径；__dirname node.js全局变量  __dirname 表示当前文件所在的目录的绝对路径 __filename 表示当前文件的绝对路径
	output: { 
		filename: 'js/bundle.js',
		path: __dirname + "/public"
	},
	devtool: 'eval-source-map',//方便调试 cheap-module-eval-source-map大型项目中打包速度快不方便调试
	devServer: {//安装npm install -g webpack-dev-server 搭建本地服务器
		contentBase: './public',//服务器加载页面得目录
		historyApiFallback: true,//不跳转
		hot:true,
		inline: true//实时刷新
	},
	module: {
		rules: [
			{
				test:/(\.jsx|\.js)$/,//正则表达式筛选文件
				use:{
					loader:'babel-loader',//loader
				},
				exclude: /node_modules/ //排除不需要处理文件
			},{
				test:/\.css$/,
				use: [{
						loader: "style-loader"//将所有的计算后的样式加入页面中
					},{
						loader: 'css-loader',//能够使用类似@import 和 url(...)的方法
						options: {
							modules: true,
							localIdentName: '[name]_[local]--[hash:base64:5]'//制定css类名格式 可防止局部css污染全局样式
						}
					}
				]

			},{
				test: /\.less$/,
				use:[{
						loader: "style-loader"//将所有的计算后的样式加入页面中
					},{
						loader: 'css-loader',//能够使用类似@import 和 url(...)的方法
						options: {
							modules: true,
							localIdentName: '[name]_[local]--[hash:base64:5]'//制定css类名格式 可防止局部css污染全局样式
						}
					},{
						loader:'less-loader'
					},{
						loader:'postcss-loader'//import得css也要用postcss-loader处理？？？
					}
				]
			},{
				test: /\.[png|jpg|svg|gif]$/,
				use: [{
					loader: "file-loader",
					options{
						name:[name]-[hash:base64:5].[ext]
					}
				},{
					loder: "url-loader",
					options:{
						limit:2000
					}
				},{
					loader: "image-webpack-loader",
				}]
			},{
		        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		        use:
		        [
		          {
		            loader: 'url-loader',
		            options:
		            {
		              limit: 8192,
		              mimetype: 'application/font-woff',
		              name: 'fonts/[name].[ext]'
		            }
		          }
		        ]
		    },{
		        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		        use:
		        [
		          {
		            loader: 'file-loader',
		            options:
		            {
		              limit: 8192,
		              mimetype: 'application/font-woff',
		              name: 'fonts/[name].[ext]'
		            }
		          }
		        ]
		    }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template:__dirname + "/app/index.html",
			title:"my html",
			inject:'false',
			date: new Date()
		}),
		new CleanWebpackPlugin(path.resolve('./public'),{
			verbose:false
		})
	]
};