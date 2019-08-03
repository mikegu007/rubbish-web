// 下单定位
<template name="order-location">
	<view class="location">
		<view class="info">
			<view class="address">
				<text class="road">逸仙路2816号</text>
				<text class="build">华滋奔腾大厦B座</text>
		  </view>
			<view class="personal">
				<text class="name">Mattie Blooman</text>
				<text class="moblie">18676567654</text>
			</view>
		</view>
		<image class="indictor extend-click" src="../../static/images/arrow-right.png"></image>
	</view>
</template>

<script>
	export default {
		name: 'order-location'
	}
</script>

<style lang="scss" scoped>
	.location {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 92%;
		height: 160rpx;
		padding: 0 30rpx;
		position: absolute;
		left: 4%;
		top: 90rpx;
		box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(33,33,33,0.1);
		border-radius: 8rpx;
		background-color: #fff;
		.info {
			flex: 1;
			.address {
				font-size: 32rpx;
				color: #4A4A4A;
				line-height: 40rpx;
				margin-bottom: 8rpx;
			}
			.personal {
				font-size: 28rpx;
				color: #808080;
				line-height: 36rpx;
			}
		}
	}
</style>
