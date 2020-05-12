import {getGoodsList} from "@/network/api/index.js"
const goodsList = {
	namespaced:true,
	state: {
		GoodsList:[]
		
	},
	// 计算属性
	getters:{
		goods(state){
			return state.GoodsList
		}
	},
	mutations:{
		SET_DATA(state,data){
			state.GoodsList=data
		}
	},
	actions:{
		getGoodsList({commit}){
			return new Promise((resolve,reject)=>{
				getGoodsList().then(res=>{
						console.log(res.data.data.home_recommend_products)
						commit("SET_DATA",res.data.data.home_recommend_products);
				})
			
			})
		}
	}
	
	
}
export default goodsList
