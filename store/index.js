import Vue from "vue"
import Vuex from "vuex"
import banner from "@/store/modules/banner.js"
import goodsList from "@/store/modules/goodsList.js"
import productDetail from "@/store/modules/productDetail.js"
import category from "@/store/modules/category.js"
import login from "@/store/modules/login.js"
import user from "@/store/modules/user.js"
import list from "@/store/modules/list.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		banner,
		goodsList,
		productDetail,
		category,
		login,
		user,
		list
	}
})
export default store
