const path = require('path');
const webpack = require('webpack');
const dllReferencePlugin = require("DllReferencePlugin");

module.exports={
	entry:{vendor:['react','react-dom']},
	output:{
		filename:'js/[name].js',
		path: path.resolve(__dirname,'public'),
		library:'[name]'//当前DLL所有内容存放在这个参数指定变量名的全局变量下，与DllPlugin参数一致
	},
	plugins:{
		new webpack.DllPlugin({
			path: path.resolve(__dirname,'public/manifest.json'),//Dll文件中各模块的索引，供DllReferencePlugin读取
			name:'[name]'
		}),
		new dllReferencePlugin({
			manifest: require('./public/manifest.json'),//指定manifeat.json
			name: 'vendor'
		})
	}
}
