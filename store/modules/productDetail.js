import {getLists} from "@/network/api/index.js"
const productDetail = {
	namespaced:true,
	state: {
		
		products:{
			//商品轮播图
			image:[],
			//商品详情
			productsDetails:{},
			//商品参数
			productsGroup:[],
			//商品参数对应得值
			productsValue:[],
			//
			productSkus:[]
		},
	},
	// 计算属性
	getters:{
		productDetails(state){
			return state.products
		}
	},
	mutations:{
		GET_LIST(state,data){
			state.products.image=data.image
			state.products.productsDetails={
				title:data.title,
				price:data.price,
				market_price:data.skus[0].market_price,
				service_tags:data.service_tags[0],
				sold_count:data.sold_count,
				on_sale:data.on_sale,
				rating:data.rating
				
			}
			state.products.productsGroup=[]
			state.products.productsGroup=data.attrGroup.map((item,index)=>{
				return {
					id:index,
					name:item
				}
			})
			state.products.productsValue=[]
			let i=0
			data.attrItems.forEach((item,index)=>{
				let obj=item.map(val=>{
					return {
						id:i++,
						pid:index,
						name:val
					}
				})
			state.products.productsValue.push(...obj)
			})
			state.products.productSkus=data.skus
		}
	},
	actions:{
		getList({commit},config){
			return new Promise((resolve,reject)=>{
				getLists(config).then(res=>{
					console.log(res.data.data)
					commit("GET_LIST",res.data.data);
					resolve();
				}).catch(err=>{
					reject(err)
				})
			})
		}
	}
	
}
export default productDetail
