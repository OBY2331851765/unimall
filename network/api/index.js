// 所有api
import http from "@/network/request.js"

//首页banner 图 生鲜蔬菜打折 产品分类
export function getNavlists(config) {
	return http.post("nav",config);
}

export function getGoodsList(){
	return http.get("product/getHomeProducts");
}
//获取产品详情
export function getLists(config){
	return http.get(`product/?id=${config}`);
}

//真产品分类接口
export function getCategoryList() {
	return http.get(`category`);
}

// 登录接口
export function getLogins(config) {
	return http.post(`index/login`,config);
}

// 验证是否登录状态
export function getUsers() {
	return http.get(`user`)
}
// 商品列表接口
export function getShopList(config) {
	return http.get(`product/getList?cat_id=${config.id}&sort=${config.sort}&priceOrder=${config.priceOrder}`);
}