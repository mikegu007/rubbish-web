<template>
	<view class="myaddress">
		<!-- 默认地址 -->
		<view class="default" v-if="defaultAddress">
			<view class="title">默认地址</view>
			<address-item :item="defaultAddress" @eidt="goEdit(defaultAddress)"></address-item>
		</view>
		<!-- 其他地址列表 -->
		<view v-if="otherAddressList.length" class="others">
			<view class="title">其他地址</view>
			<view class="list">
				<address-item class="other" v-for="item in otherAddressList" :item="item" :key="item.id" @eidt="goEdit(item)"></address-item>
			</view>
		</view>
		<tips v-if="!addressList.length" :tips="tips"></tips>
		<!-- 新增地址 -->
		<view class="new" @tap="goNew">
			<image class="new-img" src="/static/images/add.png"></image>
			<text>新增收货地址</text>
		</view>
	</view>
</template>

<script>
	import addressItem from '../../../components/address.vue'
	import tips from '../../../components/tips.vue'

	let $self
	export default {
		components: {
			'address-item': addressItem,
			'tips': tips
		},
		data() {
			return {
				uuid: '',
				tips: '没找到地址，请新增地址!',
				addressList: [] // 返回的地址列表
			};
		},
		computed: {
			defaultAddress() {
				return this.addressList.find(item => item.defaultAddress)
			},
			otherAddressList() {
				return this.addressList.filter(item => !item.defaultAddress)
			}
		},
		onShow() {
			$self = this
			this.uuid = uni.getStorageSync('uuid')
			this.queryAddList()
		},
		methods: {
			// 请求地址列表
			queryAddList() {
				uni.request({
					url: 'https://messagecome.com/user/address/list',
					data: {
						uuid: $self.uuid
					}
				}).then(infoRes => {
					let [err, res] = infoRes
					if (res.data && res.data.status === 1) {
						$self.addressList = res.data.data
					}
				})
			},
			// 编辑地址
			goEdit(address) {
				let addStr = encodeURIComponent(JSON.stringify(address))
				uni.navigateTo({
					url: `./edit?address=${addStr}`
				})
			},
			// 新增地址
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
		.default {
			box-sizing: border-box;
			padding: 10rpx 30rpx 0;
			.title {
				margin-left: 30rpx;
				margin-bottom: 10rpx;
			}
		}
		.others {
			box-sizing: border-box;
			padding-top: 10rpx;
			padding-bottom: 60rpx;
			.list {
				padding: 0 30rpx;
				.other {
					width: 100%;
					margin-bottom: 30rpx;
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
			.title {
				margin-left: 30rpx;
				margin-bottom: 10rpx;
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
