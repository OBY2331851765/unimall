<template>
	<view class="content">
		<!-- 左侧导航栏 -->
		<scroll-view scroll-y class="left-aside">
				<view v-for="(item,index) in categorys" :key="item.id" class="f-item b-b" :class="{active: index === currentId}" @click="tabtap(index)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside">
			<view v-for="item in list" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view class="t-item" v-for="titem in item.childlist" :key="titem.id"  @click="gotolist(titem.id)">
						<image :src="titem.image"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>s
<script>
	import {
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				currentId:0,
				list:[]
			}
		},
		onLoad() {
			// 首先把接口的数据获取过来
			this.getDate();
			
		},
		methods: {
			async getDate() {
				// 触发vuex 去获取数据  dispatch()方法会触发vuex  里 actions的方法
				await this.$store.dispatch("category/getClassificationList")
				this.getitemlist;

			},
			// 点击
			tabtap(index) {
				console.log(index)
				this.currentId=index;
				this.getitemlist;
			},
			// 点击获取商品列表数据
			gotolist(id) {
				console.log(id)
				uni.navigateTo({
				    url: `/pages/productDetail/list?id=${id}`
				});
				
			}
			
			
		},
		computed: {
			...mapGetters("category",{
				categorys:"categorys"
			}),
			getitemlist() {
				this.list=this.categorys[this.currentId].childlist;
			}
			

		},
		
	}
</script>

<style lang="scss">
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}

	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}

	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;

		&.active {
			color: $base-color;
			background: #f8f8f8;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside {
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}

	.s-item {
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}

	.t-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;

		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}

	.t-item {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;

		image {
			width: 140upx;
			height: 140upx;
		}
	}
</style>
<!-- http://47.56.173.44/shopdemo/public/uploads/20190906/c17fb7da6bc8ba98727c414cfaf5f5a4.png,/uploads/20190906/c17fb7da6bc8ba98727c414cfaf5f5a4.png
http://47.56.173.44/shopdemo/public/uploads/20190906/1ed175965a401295062fdc5740e4d936.jpg -->