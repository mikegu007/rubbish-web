<template>
	<view class="myaddress">
		<address-item :item="addressList.default" @eidt="goEdit"></address-item>
		<!-- <hello></hello> -->
		<view class="others">
			<text class="title">其他地址</text>
			<address-item class="other" v-for="item in addressList.others" :key="item.id" @eidt="goEdit"></address-item>
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
					default: {},
					others: [
						{ id: 0 }, 
						{ id: 1 }, 
						{ id: 2}
					]
				}
			};
		},
		onReady() {
			console.log('myAddress');
		},
		methods: {
			goEdit() {
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
	}
</style>
