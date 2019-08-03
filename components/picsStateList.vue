<template name="pics-list">
	<view class="pics-list">
		<view class="pic-state" v-for="state in picsList" :key="state.id">
			<image class="img" :src="state.avator"></image>
			<view class="info">{{ state.num }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pics-list',
		props: {
			picsList: {
				type: Array
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pics-list {
		display: flex;
		flex-wrap: nowrap;
		padding: 30rpx 26rpx 20rpx;
		background-color: #fff;
		overflow: auto;
		border-radius: 4rpx 4rpx 0 0;
		.pic-state {
			position: relative;
			flex: 0 0 82rpx;
			height: 82rpx;
			width: 82rpx;
			margin-right: 56rpx;
			&:last-child {
				margin-right: 0;
			}
			.img {
				height: 82rpx;
				width: 82rpx;
			}
			.info {
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				right: 0;
				top: 50%;
				transform: translateX(50%);
				margin-top: -20rpx;
				line-height: 40rpx;
				border: 1px solid #fff;
				border-radius: 50%;
				background-color: #3A9B6C;
				color: #fff;
				text-align: center;
				font-size: 20rpx;
				font-family: DINCondensed-Bold;
				font-weight: 700;
			}
		}
	}
</style>
