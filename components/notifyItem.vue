<template name="notify-item">
	<view class="notify">
		<view class="notify-icon"></view>
		<view class="notify-info">
			<view class="notify-tip">{{ item.relation }}
				<text class="notify-name"> {{ item.name }} </text>{{ item.content }}
			</view>
			<view class="notify-date">{{ item.date }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'notify-item',
		props: {
			item: {
				type: Object
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notify {
		height: 140rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		padding: 0 24rpx;
		background-color: #fff;
		.notify-icon {
			width: 64rpx;
			height: 64rpx;
			margin-right: 24rpx;
			background: url('../static/images/notify-icon.png') no-repeat;
			background-size: 100% 100%; 
		}
		.notify-info {
			flex: 1;
			.notify-tip {
				font-size: 30rpx;
				line-height: 40rpx;
				.notify-name {
					margin: 0 20rpx;
					font-weight: 700;
					font-size: 32rpx;
				}
			}
			.notify-date {
				font-size: 20rpx;
				line-height: 24rpx
			}
		}
	}
</style>
