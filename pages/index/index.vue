<template>
	<view class="content">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 轮播图组件 -->
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in banners" :key="index" class="carousel-item">
					<image :src="item.image" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots" v-if="banners.length>0">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 分类列表 -->
		<uni-grid class="fenlei" :columnNum="4" :showBorder="false" :options="menus">

		</uni-grid>
		<!-- 广告图片区域 -->
		<view>
			<!-- 轮播图组件 -->
			<swiper class="ggqu">
				<swiper-item v-for="(item, index) in description" :key="index">

					<image class="gv_swiper" :src="item.image" />


				</swiper-item>
			</swiper>
		</view>
		<!-- 分类精选 -->
		<view class="fen" @click="uninavtofen()">
			<view class="left">
				<image src="../../static/image/h1.png"></image>
				<view class="middle">
					<text class="ts">分类精选</text>
					<text class="tx">Competitive Products For You</text>
				</view>

			</view>
			<view class="">
				<text class="right yticon icon-you"></text>
			</view>
		</view>
		<!--商品  -->
		<view class="shop">
			<view v-for="(item,index) in goods" :key="index" class="shopbox">
				<view class="goodTitle">
					{{item.title}}
				</view>
				<scroll-view scroll-x="true" scroll-left="120">
					<view class="goodList">
						<view class="goods-item" v-for="(val,index) in item.products" :key="index" @click="getProduct(val.id)">
							<image :src="val.image[0]"></image>
							<text class="goodsText">{{val.title}}</text>
							<text class="goodsPrice">{{val.price}}</text>
							
						</view>
						<view class="lookMore" style="margin-left: 5px;">
							<text>查看全部</text>
							<text>More+</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view>
				
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				//首页轮播图
				// banners: [],
				// //菜单栏
				// menus: [],
				// //广告栏
				// description: [],
				swiperCurrent: 0,
				swiperLength: 0

			}
		},
		onLoad() {
			this.getData();
		},
		computed: {
			...mapGetters("banner", {
				banners: "banners",
				menus: "menus",
				description: "description"
			}),
			...mapGetters("goodsList", {
				goods: "goods"
			})

		},
		methods: {
			async getData() {
				//触发vuex 里面的获取轮播图分类数据
				await this.$store.dispatch("banner/getNavList");
				//获取首页的产品数据
				await this.$store.dispatch("goodsList/getGoodsList")

			},
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index
			},
			getProduct(id) {
				uni.navigateTo({
					url: `/pages/productDetail/productDetail?id=${id}`,
					
				});
			},
			uninavtofen(){
				uni.switchTab({
				    url: '/pages/category/category'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #f5f5f5;
	}

	.carousel-section {
		position: relative;
		padding: 20upx;
		background-color: #FFFFFF;

	}

	.carousel {
		background-color: #FFFFFF;
		height: 180px;

		image {
			width: 100%;
			height: 100%;
			border-radius: 25px;
		}
	}

	.swiper-dots {
		position: absolute;
		left: 45upx;
		bottom: 40upx;
		color: #FFFFFF;
		font-size: 20upx;
	}

	.gv_swiper {
		width: 100%;
		height: 100%;

	}

	.ggqu {
		padding-bottom: 30upx;
	}

	.fenlei {
		background-color: #fff;
	}

	.fen {
		height: 100px;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30upx;

		.left {
			display: flex;
			margin-left: 20px;

			image {
				width: 80upx;
				height: 80upx;
			}
		}

		.right {
			margin-right: 20px;
		}
	}

	.middle {
		display: flex;
		margin-left: 10px;
		flex-direction: column;

		.ts {}

		.tx {
			color: #f0f0f0;
		}
	}
	
	.goodTitle{
		width: 170upx;
		border-right: red 4px solid;
		margin-left: 20upx;
		margin-bottom: 20upx;
	}
	.shop{

		margin-bottom: 20upx;
		width: 100%;
	}
	.goodList{
		display:  flex;
		width: 100%;
		margin-bottom: 40upx;
				
	}
	.goods-item image{
		width:230upx;
		height: 250upx;
		margin: 10upx 10upx;
	}
	.goodsText{
		display: inline-block;
		white-space: nowrap;
		width: 230upx;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 14px;
		margin-left: 10upx;
}
.goodsPrice{
	margin-left: 10upx;
	color: #Fa265F;
	font-size: 18px;
}
.lookMore{
	width:230upx;
	height: 250upx;
	display: flex;
	justify-content: center;
	flex-direction: column;
	flex-shrink: 0;
	border-radius: 6upx;
	background-color: #f3f3f3;
	align-items: center;
}
scroll-view{
	margin-bottom: 40upx;
	background-color: #FFFFFF;
}
.shopbox{
	background-color: #FFFFFF;
	padding-top: 20upx;
}
</style>
