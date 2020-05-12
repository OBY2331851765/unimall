import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

const msg =(title,duration=2000,icon="none",mask=false)=>{
	if(Boolean(title)===false){
		return 
	}
	uni.showToast({
	    title,
		duration,
		icon,
		mask
	});
}
Vue.prototype.$message=msg;
const app = new Vue({
	store,
    ...App
})
app.$mount()
