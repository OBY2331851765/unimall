import ajax from '@/network/index.js'
//导入网站根目录
import Config from "@/network/config.js"
//实例化ajax类
const http= new ajax(); 
//设置配置项
http.setConfig(config =>{
	config.baseUrl = Config.server
	config.responseType="json"
	return config
});
//设置请求拦截器
http.interceptor.request(config =>{
	const token=uni.getStorageSync("Xshop-Token")
	// 设置请求消息头
	// console.log(config)
	config.header["Xshop-Token"]=token;
	return config
})

//设置响应拦截器
http.interceptor.response(res =>{
	return res
})

export default http
