const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');//将bundle的文件名输出，保存成json

module.exports={
	entry:{vendor:['react','react-dom']},
	devtool: '#source-map',
	output:{
		filename:'[name].[hash].js',
		path: path.resolve(__dirname,'./public/vendor'),
		library:'[name]_[hash]'//当前DLL所有内容存放在这个参数指定变量名的全局变量下，与DllPlugin参数一致
	},
	plugins:[
		new webpack.DllPlugin({ 
			path: path.resolve(__dirname,'./public/vendor/manifest.json'),//Dll文件中各模块的索引，供DllReferencePlugin读取
			name:'[name]_[hash]',
			context: __dirname,
		}),
		new AssetsPlugin({
			path: path.resolve(__dirname , "./public/vendor/"),
            filename: 'bundle-config.json',
        }),
		new CleanWebpackPlugin(path.resolve('./public'),{
			verbose:false
		})
	]
}

