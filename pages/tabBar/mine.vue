<template>
	<view class="map-wrapper">
		<button v-if="!hasUserInfo" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登录</button>
		<view v-if="hasUserInfo" class="header">
			<view class="personal">
				<image class="avator" :src="userInfo.avatarUrl"></image>
				<view class="info">
					<view class="name">{{ userInfo.nickName }}</view>
					<image class="level" src="/static/images/rank.png"></image>
				</view>
			</view>
			<!-- 红包 -->
			<view class="red-packet" @tap="goRedPackage">
				<view class="left">
					<view class="title">红包</view>
					<view class="content"><text class="num">{{ packetNum }}</text>个未使用</view>
				</view>
				<view class="right extend-click"></view>
			</view>
			<!-- 能量 -->
			<view class="energy">
				<view class="left">
					<view class="title">能量</view>
					<view class="content"><text class="num">13.8</text>kg</view>
				</view>
				<view class="right extend-click"></view>
			</view>
		</view>
		<view class="category">
			<view class="item" @tap="goMyAddress">
				<image class="img" src="/static/images/address.png"></image>
				<text class="text">我的地址</text>
				<image class="indictor extend-click" src="/static/images/arrow-right.png"></image>
			</view>
			<view class="item" @tap="goMyOrder">
				<image class="img" src="/static/images/order.png"></image>
				<text class="text">我的订单</text>
				<image class="indictor extend-click" src="/static/images/arrow-right.png"></image>
			</view>
			<view class="item" @tap="goMyEnergy">
				<image class="img" src="/static/images/mall.png"></image>
				<text class="text">能量商场</text>
				<image class="indictor extend-click" src="/static/images/arrow-right.png"></image>
			</view>
			<view class="item"  @tap="goMyService">
				<image class="img" src="/static/images/service.png"></image>
				<text class="text">我的客服</text>
				<image class="indictor extend-click" src="/static/images/arrow-right.png"></image>
			</view>
			<view class="item"  @tap="goMyRule">
				<image class="img" src="/static/images/rule.png"></image>
				<text class="text">规则中心</text>
				<image class="indictor extend-click" src="/static/images/arrow-right.png"></image>
			</view>
		</view>
		<view v-if="showService" class="mask">
			<view class="footer">
				<view class="service">
					<view class="title">我的客服</view>
					<view class="mobile">客服热线：123672736</view>
				</view>
				<view class="can" @tap="canService">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getLocationSetting } from '../../utils/methods'

	const amapFile = require('../../lib/amap-wx.js')
	let $self

	export default {
		data() {
			return {
				hasUserInfo: false, // 是否拥有用户信息
				userInfo: {}, // 用户信息
				showService: false, // 显示服务弹窗
				packetNum: 0
			};
		},
		onReady() {
			$self = this
			let userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				this.userInfo = userInfo.userInfo
				this.hasUserInfo = true
				// let uuid = uni.getStorageSync('uuid')
			} else {
				this.hasUserInfo = false
			}
		},
		onShow() {
			this.queryPacket()
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				uni.getUserInfo({
					provider: 'weixin',
					success(infoRes) {
						uni.setStorageSync('userInfo', infoRes)
						$self.hasUserInfo = true
						$self.userInfo = infoRes.userInfo
						// uni.getStorageSync('appInfo')
						let appInfo = uni.getStorageSync('appInfo')
						$self.addUserInfo(appInfo.openid)
					},
					fail(err) {
						$self.hasUserInfo = false
					}
				})
			},
			// 更新用户信息
			addUserInfo(openid) {
				let params = {
					openId: openid,
					userImage: $self.userInfo.avatarUrl || '',
					userMobile: '',
					userName: $self.userInfo.nickName,
					userSex: $self.userInfo.gender
				}
				uni.request({
					url: "https://messagecome.com:9022/user/info/mainTain",
					method: 'POST',
					data: params
				}).then(infoRes => {
					let [err, res] = infoRes
					if (res.data && res.data.status === 1 && !res.data.errCode) {
						uni.setStorageSync('uuid', res.data.data)
					}
				})
			},
			// 查询红包数量
			queryPacket() {
				let uuid = uni.getStorageSync('uuid')
				if (!uuid) return
				uni.request({
					url: 'https://messagecome.com:9022/red/packet/uuid',
					data: {
						uuid: uuid
					}
				}).then(infoRes => {
					let [err, res] = infoRes
					if (infoRes.data && infoRes.data.status ===1) {
						$self.packetNum = res.data.data
					}
				}).catch(err => reject(err))
			},
			// 跳转红包
			goRedPackage() {
				uni.navigateTo({
					url: '../mine/myRedPackage/myRedPackage'
				})
			},
			// 我的地址
			goMyAddress() {
				let getLoaction = () => {
					uni.getLocation({
						type: 'wgs84',
						success(res) {
							let myAmapFun = new amapFile.AMapWX({key: '253f8eb5f9c6084e388cbd85ef0982ee'});
							myAmapFun.getRegeo({
								success(address) {
									let city = address[0].regeocodeData.addressComponent.city
									uni.setStorageSync('curCity', city)
								}
							})
							uni.navigateTo({
								url: '../mine/myAddress/myAddress'
							})
						},
						fail(err) {
							console.log(err)
						}
					})
				}	
				getLocationSetting(getLoaction)
			},
			// 我的订单
			goMyOrder() {
				uni.navigateTo({
					url: '../mine/myOrder/myOrder'
				})
			},
			// 我的能量
			goMyEnergy() {
				uni.navigateTo({
					url: '../mine/myEnergy/myEnergy'
				})
			},
			// 我的服务
			goMyService() {
				this.showService = true
			},
			// 关闭我的服务弹窗
			canService () {				
				this.showService = false
			},
			// 我的规则
			goMyRule() {
				uni.navigateTo({
					url: '../mine/myRule/myRule'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.map-wrapper {
		width: 100%;
		height: 100%;
		.header {
			position: relative;
			width: 100%;
			height: 304rpx;
			background-color: #1DA06E;
			.personal {
				padding: 18rpx 30rpx 0;
				display: flex;
				align-items: center;
				.avator {
					width: 132rpx;
					height: 132rpx;
					margin-right: 24rpx;
					border-radius: 50%;
				}
				.info {
					flex: 1;
					.name {
						font-size: 36rpx;
						line-height: 44rpx;
						color: #fff;
					}
					.level {
						width: 28rpx;
						height: 33rpx;
					}
				}
			}
			.red-packet {
				box-sizing: border-box;
				position: absolute;
				width: 45%;
				height: 182rpx;
				left: 4%;
				top: 173rpx;
				background-color: #fff;
				border-radius: 8rpx;
				padding: 50rpx 36rpx;
				display: flex;
				align-items: center;
				.left {
					flex: 1;
					.title {
						font-weight: 700;
						font-size: 32rpx;
						line-height: 48rpx;
						color: #4A4A4A;
					}
					.content {
						line-height: 48rpx;
						.num {
							color: #FA6400;
							font-family: HelveticaNeue;
							font-size: 32rpx;
						}
					}
				}
				.right {
					width: 66rpx;
					height: 66rpx;
					background: url('../../static/images/red-package.png') no-repeat;
					background-size: 100% 100%;
				}
			}
			.energy {
				position: absolute;
				box-sizing: border-box;
				width: 45%;
				height: 182rpx;
				right: 4%;
				top: 173rpx;
				background-color: #fff;
				border-radius: 8rpx;
				padding: 50rpx 36rpx;
				display: flex;
				align-items: center;
				.left {
					flex: 1;
					.title {
						font-weight: 700;
						font-size: 32rpx;
						line-height: 48rpx;
						color: #4A4A4A;
					}
					.content {
						line-height: 48rpx;
						.num {
							color: #FA6400;
							font-family: HelveticaNeue;
							font-size: 32rpx;
						}
					}
				}
				.right {
					width: 66rpx;
					height: 66rpx;
					background: url('../../static/images/circle.png') no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.category {
			margin: 80rpx 30rpx 0;
			padding: 0 36rpx;
			background-color: #fff;
			.item {
				height: 88rpx;
				line-height: 88rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #E0E0E0;
				&:last-child {
					border: none;
				}
				.text {
					font-size: 32rpx;
					flex: 1;
					margin-left: 24rpx;
				}
				.img {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
		.mask {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background:rgba(0,0,0,0.4);
			z-index: 10;
			.footer {
				position: fixed;
				left: 0;
				bottom: 0rpx;
				box-sizing: border-box;
				width: 100%;
				padding: 20rpx;
				.service {
					border-radius: 26rpx;
					background-color: #fff;
					margin-bottom: 30rpx;
					.title {
						height: 92rpx;
						line-height: 92rpx;
						text-align: center;
						font-size: 28rpx;
						color: #8F8E94;
						border-bottom: 2rpx solid #E0E0E0;
					}
					.mobile {
						height: 108rpx;
						line-height: 108rpx;
						text-align: center;
						font-size: 40rpx;
						color: #1DA06E;
					}
				}
				.can {
					height: 114rpx;
					line-height: 114rpx;
					text-align: center;
					border-radius: 26rpx;
					background-color: #fff;
					font-size: 40rpx;
					color: #6D7278;
				}
			}
		}
	}
</style>

