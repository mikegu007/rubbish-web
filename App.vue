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

<style lang="scss">
	/*每个页面公共css */
	page {
		height: 100%;
		background-color: #F8F8F8;
		font-size: 26rpx;
		font-family:PingFangSC-Regular;
		color:rgba(74,74,74,1);
		line-height:42px;
	}
	.extend-click {
		position: relative;
		&::after {
			content: '';
			position: absolute;
			top: -10px;
			right: -10px;
			bottom: -10px;
			left: -10px;
		}
	}
	.submit {
		height: 90rpx;
		border-radius: 45rpx;
		// margin: 0 30rpx;
		font-size: 40rpx;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		background-color: rgba(29,160,110,1);
	}
</style>
