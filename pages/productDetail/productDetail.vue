<template>
	<view class="box">
		<!-- 轮播图 -->
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in productDetails.image" :key="index">
					<view class="image-wrapper">
						<image :src="item" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{productDetails.productsDetails.title}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{productDetails.productsDetails.price}}</text>
				<text class="m-price">¥{{productDetails.productsDetails.market_price}}</text>
				<text class="coupon-tip" v-if="isshow">{{productDetails.productsDetails.service_tags}}</text>
			</view>
			<view class="bot-row">
				<text>销量: {{productDetails.productsDetails.sold_count}}</text>
				<text>库存: {{productDetails.productsDetails.on_sale}}</text>
				<text>浏览量: {{productDetails.productsDetails.rating}}</text>
			</view>
		</view>

		<!-- 购买类型 -->
		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="productDetails.image[0]"></image>
					<view class="right">
						<text class="price" v-if="selectItem.length">¥{{selectItem[0].price}}</text>
						<text class="stock" v-if="selectItem.length">库存:{{selectItem[0].stock}}</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<!-- 渲染规则项 -->
				<view v-for="(item,index) in productDetails.productsGroup" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in productDetails.productsValue" v-if="childItem.pid === item.id" :key="childIndex"
						 class="tit" :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem.pid)">
							{{childItem.name}}
						</text>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
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
				//选中类型的数组
				specSelected: [],
				//控制规则的模态窗口的显示与影藏
				specClass: 'none',
				// 规则的名字
				specList: [],
				// 规则对应的值
				specChildList: [],
				// 选中的项
				selectItem: {}
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.getData(options.id);
		},
		computed: {
			...mapGetters("productDetail", {
				productDetails: "productDetails",
			}),
			isshow() {
				return this.productDetails.productsDetails.service_tags != undefined
			},
			// 从vuex中获取数据
			getShow() {
				this.specList = this.productDetails.productsGroup
				this.specChildList = this.productDetails.productsValue
			},
			// 用商品类型去匹配对应规则
			seletLx() {
				//    
				let newstr = ""
				const str = this.specSelected.map(item => {

					return newstr += item.name + ","


				})
				newstr = newstr.substring(0, newstr.length - 1)
				console.log(newstr)
				const newvalue=this.productDetails.productSkus.filter(item => {
						return item.value===newstr
				})
			
				this.selectItem=[...newvalue]

			}
		},
		methods: {
			async getData(id) {
				await this.$store.dispatch("productDetail/getList", id)
				this.getShow
				this.specList.forEach(item => {
					console.log("ddd+++")
					for (let cItem of this.specChildList) {
						if (cItem.pid === item.id) {
							this.$set(cItem, "selected", true)
							this.specSelected.push(cItem)
							break;
						}
					}
				})
				this.seletLx
			},
			// 选择类型
			selectSpec(cindex, pid) {
				console.log(cindex, pid)
				this.specChildList.forEach(item => {

					if (item.pid === pid) {
						// console.log(item)
						this.$set(item, "selected", false)

					}
				})
				this.$set(this.specChildList[cindex], "selected", true)


				this.specSelected = []
				this.specChildList.forEach(item => {
					if (item.selected === true) {
						console.log(item)
						this.specSelected.push(item)
					}
				})
				this.seletLx

			},
			// 阻止冒泡
			stopPrevent() {

			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
				this.seletLx
			},
		}
	}
</script>

<style lang="scss">
	//
	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	// 购买类型
	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}

			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 93%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}
</style>
