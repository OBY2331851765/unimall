import {
	getUsers
} from "@/network/api/index.js"
const user = {
	namespaced: true,
	state: {
		userInfo:{},
	// 状态码
	haslogin:false
	
	},
	getters: {
		getData(state){
			return state.userInfo
		},
		show(state){
			return state.haslogin
		}
	},
	mutations: {
		SET_DATA(state,data) {
			state.haslogin=true;
			state.userInfo=data.data.data;
		},
		CLEAR(state)
		{
			state.haslogin=false;
			state.userInfo={}
			uni.clearStorage();
		}

	},
	actions: {
		getUser({
			commit
		}, config) {
			return new Promise((resolve, reject) => {
				getUsers(config).then(res => {
					console.log(res)
					if(res.data.code==1){
					
					commit("SET_DATA", res);
					
					}
				
					resolve(res)
				}).catch(e => {
					reject()
				})
			})
		}
	}


}
export default user
