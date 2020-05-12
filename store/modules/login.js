import {getLogins} from "@/network/api/index.js"
const login={
	namespaced:true,
	state:{
		headmsg:""
	},
	getters:{

	},
	mutations:{
		SET_DATA(state,data){
			console.log(data)
			state.headmsg=data.data.data.token
			uni.setStorage({
				key:"Xshop-Token",
				data:state.headmsg
			})
		}
	},
	actions:{ 
		getLogin({commit},config){
			return new Promise((resolve,reject)=>{
				getLogins(config).then(res=>{
					console.log(res)
					resolve(res)
				}).catch(e=>{
					reject()
				})
			})
		}
	}
	
	
}
export default login