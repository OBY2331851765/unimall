<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
			font-family: yticon;
			font-weight: normal;
			font-style: normal;
			src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
		}
		
		.yticon {
			font-family: "yticon" !important;
			font-size: 16px;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}
		
		.icon-you:before {
			content: "\e606";
		}
		
		/* 全部订单 */
			.icon-shouye:before {
				content: "\e626";
			}
			
			/* 待付款 */
			.icon-daifukuan:before {
				content: "\e68f";
			}
			
			/* 待收货 */
			.icon-yishouhuo:before {
				content: "\e71a";
			}
			
			/* 待评价 */
			.icon-pingjia:before {
				content: "\e67b";
			}
			 /*收货地址 */
				.icon-dizhi:before {
					content: "\e614";
				}
				/* 我的收藏 */
				.icon-shoucang_xuanzhongzhuangtai:before {
				    content: "\E6A9";
				}
				/* 设置 */
				.icon-shezhi:before {
				    content: "\E60F";
				}
</style>
