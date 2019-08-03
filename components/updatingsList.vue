<template name="updatings-list">
	<view class="updatings-list">
		<view v-for="updating in updatingsList" :key="item.id" class="update">
			<image v-if="showIcon" class="update-icon" src="../static/images/update-icon.png"></image>
			<text class="update-name">{{ updating.name }}</text>
			<text class="update-content">{{ updating.content }}</text>
			<text class="update-date">{{ updating.date }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'updatings-list',
		props: {
			updatingsList: {
				type: Array,
			},
			showIcon: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.updatings-list {
		// width: 100%;
		padding: 0 26rpx 14rpx;
		background-color: #fff;
		.update {
			height: 62rpx;
			display: flex;
			align-items: center;
			.update-icon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 26rpx;
			}
			.update-name {
				width: 160rpx;
				margin-right: 50rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				color: #4A4A4A;
			}
			.update-content {
				flex: 1;
				font-size: 30rpx;
			}
			.update-date {
				width: 120rpx;
				color: #787878;
				font-size: 28rpx;
				text-align: right;
			}
		}
	}
</style>
