import {
	getCategoryList
} from "@/network/api/index.js"
const category = {
	namespaced: true,
	state: {
		list:[]
	},
	// 计算属性
	getters:{
		categorys(state){
			return state.list
		}
	},
	mutations:{
		SET_GETCLASSIFICATIONLIST(state,data){
			//这里就操作源码映射方便到时候渲染数据
			state.list=data
			
		}
	},
	actions:{
		//由category.vue中dispacth定义触发该方法
		getClassificationList({commit}){
			//大多返回一个new Promise对象
			return new Promise((resolve,reject)=>{
				//调用api 接口去获取数据
				getCategoryList().then(res=>{
					console.log(res.data.data);
					const data=res.data.data;
					// 触发commit 去调用mutations:方法
					commit("SET_GETCLASSIFICATIONLIST",data)
					resolve();
				}).catch(e =>{
					reject();
				})
			})
		}
	}
	
	
}
export default category
