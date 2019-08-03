<template name="friends">
	<view class="friends-list">
	<!-- <view :scroll-x="true" :enable-flex="true" class="friends-list"> -->
		<view class="friend" v-for="(friend, index) in friendsList" :key="friend.id">
			<image class="friend-pic" :src="friend.avator"></image>
			<view class="friend-name">{{ friend.name }}</view>
			<view class="friend-submit">加好友</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'friends',
		props: {
			friendsList: {
				type: Array
			}
		}
	}
</script>

<style lang="scss" scoped>
	.friends-list {
		height: 322rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow: auto;
		.friend {
			flex: 0 0 220rpx;
			// width: 220rpx;
			height: 322rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			margin-right: 15rpx;
			&:last-child {
				margin-right: 0;
			}
			.friend-pic {
				width: 120rpx;
				height: 120rpx;
				border-radius: 10rpx;
			}
			.friend-name {
				font-size: 34rpx;
				line-height: 42rpx;
				margin: 28rpx 0;
			}
			.friend-submit {
				width: 132rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				color: #fff;
				font-size: 30rpx;
				background: #1DA06E;
				border-radius: 28rpx;
			}
		}
	}
</style>
