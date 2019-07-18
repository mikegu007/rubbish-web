<template name="red-item">
	<view class="red-item" :class="{'disabled': disabled}">
		<view class="circle-top"></view>
		<view class="circle-bottom"></view>
		<view v-if="disabled" class="disvalid-bg"></view>
		<view v-else class="valid-bg"></view>
		<view class="amount" :class="{'disabled': disabled}">
			<text class="currency">¥</text>
			<text class="num">8</text>
		</view>
		<view class="info">
			<view class="title">8元优惠券</view>
			<view class="usage">满35元可用</view>
			<view class="valid">
				有效期：2019/07/02 -- 2019/07/04
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'red-item',
		data() {
			return {
				
			}
		},
		props: {
			disabled: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.red-item {
		display: flex;
		position: relative;
		margin-bottom: 30rpx;
		padding: 36rpx 36rpx 36rpx 0;
		background-color: #fff;
		box-shadow: 0rpx 2rpx 6rem 0px rgba(0,0,0,0.06);
		border-radius: 8rpx;
		&.disabled {
			opacity: 0.7;
		}
		.circle-top, .circle-bottom {
			position: absolute;
			// width: 20rpx;
			// height: 20rpx;
			border: 10rpx solid #F8F8F8;
			background-color: #F8F8F8;
			border-radius: 50%;
		}
		.circle-top {
			left: 156rpx;
			top: -10rpx;
		}
		.circle-bottom {
			left: 156rpx;
			bottom: -10rpx;
		}
		.valid-bg {
			position: absolute;
			width: 86rpx;
			height: 32rpx;
			top: 36rpx;
			right: 42rpx;
			background: url('../static/images/valid.png') no-repeat;
			background-size: 100% 100%;
		}
		.disvalid-bg {
			position: absolute;
			width: 100rpx;
			height: 62rpx;
			top: 36rpx;
			right: 42rpx;
			background: url('../static/images/disvalid.png') no-repeat;
			background-size: 100% 100%;
		}
		.amount {
			width: 166rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FA6400;
			border-right: 2rpx dashed #979797;
			&.disabled {
				color: #808080;
			}
			.currency {
				font-size: 28rpx;
			}
			.num {
				font-weight: 700;
				font-size: 70rpx;
			}
		}
		.info {
			flex: 1;
			padding-left: 56rpx;
			.title {
				font-weight: 700;
				font-size: 32rpx;
				line-height: 40rpx;
				color: #4D4D4D;
			}
			.usage {
				font-size: 28rpx;
				line-height: 36rpx
			}
			.valid {
				font-size: 28rpx;
				line-height: 36rpx;
			}
		}
	}
</style>
