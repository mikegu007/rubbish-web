// 抢单定位
<template name="receive-location">
	<view class="location" @tap="goAddSetting">
		<view class="info">
			<view class="item">
				<text class="label">我的定位：</text>
				<text class="text">逸仙路2816号 华滋奔腾大厦B座</text>
		  </view>
			<view class="item">
				<text class="label">抢单小区：</text>
				<text class="text">3个</text>
			</view>
		</view>
		<image class="indictor extend-click" src="../../static/images/arrow-right.png"></image>
	</view>
</template>

<script>
	export default {
		name: 'receive-location',
		methods: {
			goAddSetting() {
				this.$emit('goAddSetting')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.location {
		display: flex;
		align-items: center;
		height: 160rpx;
		box-sizing: border-box;
		width: 92%;
		padding: 0 30rpx;
		position: absolute;
		left: 4%;
		top: 90rpx;
		box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(33,33,33,0.1);
		border-radius: 8rpx;
		background-color: #fff;
		.info {
			flex: 1;
			.item {
				display: flex;
				align-items: center;
				height: 40rpx;
				&:first-child {
					margin-bottom: 8rpx;
				}
				.label {
					font-size: 28rpx;
					color: #808080;
				}
				.text {
					font-size: 32rpx;
					color: #4A4A4A;
				}
			}
		}
	}
</style>
