<template>
	<view class="myaddress">
		<address-item :item="addressList.default" @eidt="goEdit"></address-item>
		<!-- <hello></hello> -->
		<view class="others">
			<text class="title">其他地址</text>
			<address-item class="other" v-for="item in addressList.others" :key="item.id" @eidt="goEdit"></address-item>
		</view>
		<view class="new" @tap="goNew">
			<image class="new-img" src="/static/images/add.png"></image>
			<text>新增收货地址</text>
		</view>
	</view>
</template>

<script>
	import addressItem from '../../../components/address.vue'
	
	export default {
		components: {
			'address-item': addressItem
		},
		data() {
			return {
				addressList: {
					default: { isCur: true }, // isCur是否是当前选中地址
					others: [
						{ id: 0 }, 
						{ id: 1 }, 
						{ id: 2}
					]
				}
			};
		},
		onReady() {
		},
		methods: {
			goEdit() {
				uni.navigateTo({
					url: './edit'
				})
			},
			goNew() {
				uni.navigateTo({
					url: './edit'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myaddress {
		.others {
			margin-top: 10rpx;
			.other {
				margin-bottom: 30rpx;
			}
			.title {
				margin-left: 30rpx;
			}
		}
		.new {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #fff;
			font-size: 32rpx;
			color: #1DA06E;
			.new-img {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>
