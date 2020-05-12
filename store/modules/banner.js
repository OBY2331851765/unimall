import {
	getNavlists
} from "@/network/api/index.js"
const banner = {
	namespaced: true,
	state: {
		bannerList: [],
		menusList: [],
		adList: []
	},
	// 计算属性
	getters: {
		banners(state) {
			return state.bannerList
		},
		menus(state) {
			return state.menusList
		},
		description(state) {
			return state.adList
		}

	},
	mutations: {
		SET_GETNAVLIST(state, data) {
			state.bannerList = data[0]
			state.menusList = data[1].map(item => {
				return {
					image: item.image,
					id: item.id,
					text: item.title,
					nva_type: item.nav_type,
				}
			})
			state.adList = data[2]
		}
	},
	//请求异步的方法
	actions: {
		//由dispatch触发到这
		getNavList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getNavlists({
					nav_type: [0, 1, 2]
				}).then(res => {
					console.log(res.data.data)
					const data = res.data.data;
					commit("SET_GETNAVLIST", data);
					resolve()
				}).catch(e => {
					reject()
				})
			})
		}
	}


}
export default banner
