import {
	getShopList
} from "@/network/api/index.js"
const list = {
	namespaced:true,
	state: {
		shopList:{}
	},
	// 计算属性
	getters:{
		goodsList(state){
			return state.shopList
		}
	},
	mutations:{
		GETSHOPLIST(state,data){
			// console.log(data)
			state.shopList=data.data.data.data
		}
	},
	actions:{
		getShopLists({commit},config){
			return new Promise((resolve,reject)=>{
					getShopList(config).then(res=>{
			
						// 触发mutations
						commit("GETSHOPLIST",res);
					resolve(res)
					}).catch(r=>{
						reject()
					})
			})
		
		}
	}
	
	
}
export default list
