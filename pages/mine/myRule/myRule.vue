<template>
	<view class="rule-center">
		<view class="rule-box">
			<view class="rule-item" @tap="goPrivacy">
				<text class="text">隐私政策</text>
				<image class="indictor extend-click" src="../../../static/images/arrow-right.png"></image>
			</view>
			<view class="rule-item">
				<text class="text">用户协议</text>
				<image class="indictor extend-click" src="../../../static/images/arrow-right.png"></image>
			</view>
			<view class="rule-item" @tap="goFeedback">
				<text class="text">意见反馈</text>
				<image class="indictor extend-click" src="../../../static/images/arrow-right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			goPrivacy() {
				uni.navigateTo({
					url: './privacy/privacy'
				})
			},
			goFeedback() {
				uni.navigateTo({
					url: './feedback/feedback'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rule-center {
		padding : 36rpx 30rpx 0;
		.rule-box {
			padding: 0 36rpx;
			background-color: #fff;
			.rule-item {
				height: 88rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #E0E0E0;
				&:last-child {
					border: none;
				}
				.text {
					flex: 1;
					font-size: 36rpx;
					margin-left: 12rpx;
				}
				.indictor {
					width: 16rpx;
					height: 26rpx;
				}
			}
		}
	}
</style>
