<template>
	<view class="order-wrapper">
		<view class="header">
			<view class="item" :class="{'active': activeIndex === $index}" v-for="(order, $index) in orderArr" :key="order.type" @tap="checkIndex($index)">
				<text class="text">{{ order.text }}</text>
			</view>
			<place-location v-if="activeIndex === 0 && ordering === 0" :info="placeOrderInfo"></place-location>
			<gen-order v-else-if="activeIndex === 0 && ordering === 1" @cancel="cancelOrder" @continue="continueOrder"></gen-order>
			<receive-location v-else @goAddSetting="goAddSetting"></receive-location>
		</view>
		<view class="content">
			<place-order v-if="activeIndex === 0 && ordering === 0" :item="placeOrderInfo" @submit="submitOrder"></place-order>
			<grab-list v-if="activeIndex === 1" :list="GrabList" @grab="grab" @check-detail="checkDetail"></grab-list>
		</view>
		<view class="mask" v-if="grabTipsShow || orderDetailShow">
			<view class="middle order-info" v-if="grabTipsShow">
				<image class="suc-pic" src="/static/images/success-orange.png"></image>
      	<view class="suc-txt">抢单成功</view>
				<view class="next">
					<view class="btn extend-click cancel" @tap="goDetail">查看订单</view>
					<view class="btn extend-click continue" @tap="goContinue">继续抢单</view>
				</view>
			</view>
			<view class="middle grab-suc" v-if="orderDetailShow">
				<view class="title">
					<image class="funnel" src="/static/images/funnel.png"></image>
					<view class="txt">
						<text class="time">
							{{ curOrderDetail.time | timeFilter }}
						</text>
						<text>倒计时</text>
					</view>
					<image class="close extend-click" src="/static/images/close.png" @tap="closeDetail"></image>
				</view>
				<view class="detail">
					<view class="item">
						<text class="label">用户名：</text>
						<text class="txt">{{ curOrderDetail.user }}</text>
					</view>
					<view class="item">
						<text class="label">手机号：</text>
						<text class="txt">{{ curOrderDetail.mobile }}</text>
					</view>
					<view class="item">
						<text class="label">地址：</text>
						<text class="txt">{{ curOrderDetail.address }}</text>
					</view>
					<view class="item">
						<text class="label">大型袋子：</text>
						<text class="txt">{{ curOrderDetail.bigNum }}袋</text>
					</view>
					<view class="item">
						<text class="label">小型袋子：</text>
						<text class="txt">{{ curOrderDetail.smallNum }}袋</text>
					</view>
					<view class="item">
						<text class="label">备注：</text>
						<text class="txt">{{ curOrderDetail.remark ? curOrderDetail.remark : '无' }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import PlaceLocation from '../order/placeLocation/placeLocation.vue'
	import ReceiveLocation from '../order/receiveLocation/receiveLocation.vue'
	import PlaceOrder from '../order/placeOrder/placeOrder.vue'
	import GenOrder from '../order/genOrder/genOrder.vue'
	import GrabList from '../../components/grabList.vue'
	
	let $self;
	export default {
		components: {
			'place-location': PlaceLocation,
			'receive-location': ReceiveLocation,
			'place-order': PlaceOrder,
			'gen-order': GenOrder,
			'grab-list': GrabList
		},
		data() {
			return {
				// 顶部tab
				orderArr: [
					{ type: 0, text: '下单' },
					{ type: 0, text: '抢单' }
				],
				uuid: '',
				activeIndex: 0, // 0 下单 1 抢单
				ordering: 0, // 0 正在下单 1 生成订单
				// 下单信息
				placeOrderInfo: {
					name: '', // 姓名
					mobile: '', // 电话
					address: '', // 地址
					addressDetail: '', // 详细地址
					longitude: '', // 经纬度
					latitude: '',
					smallNum: 0, // 小袋数量
					middleNum: 0, // 中袋数量
					bigNum: 0, // 大袋数量
					redUsable: 3, // 红包可用数
					discount: 0, // 优惠
					total: 0, // 合计
					remark: '', // 备注
					allowed: false, // 复选框
				},
				GrabList: [
					{ avator: '/static/images/user.png', location: '逸仙路2816号 华滋奔腾大厦B座', num: 3, type: 1, id: 0 },
					{ avator: '/static/images/user.png', location: '逸仙路2816号 华滋奔腾大厦B座', num: 3, type: 0, id: 1 },
					{ avator: '/static/images/user.png', location: '逸仙路2816号 华滋奔腾大厦B座', num: 3, type: 0, id: 2 },
					{ avator: '/static/images/user.png', location: '逸仙路2816号 华滋奔腾大厦B座', num: 3, type: 0, id: 3 }
				],
				grabTipsShow: false, // 签单成功提示
				orderDetailShow: false, // 订单详情
				curOrderDetail: { // 当前商品明细
				}
			};
		},
		onLoad() {
			$self = this
			let uuid = uni.getStorageSync('uuid')
			this.uuid = uuid ? uuid : ''
			this.queryAddList()
			this.queryPacket()
		},
		methods: {
			// 请求地址列表
			queryAddList() {
				uni.request({
					url: 'http://49.234.39.19:9022/user/address/list',
					data: {
						uuid: $self.uuid
					}
				}).then(infoRes => {
					let [err, res] = infoRes
					if (res.data && res.data.status === 1) {
						if (!res.data.data.length) { // 地址列表为空
							this.placeOrderInfo.address = '请添加地址'
							let userInfo = uni.getStorageSync('userInfo')
							if (userInfo) {
								this.placeOrderInfo = Object.assign(this.placeOrderInfo, {
									name: userInfo.userInfo.nickName
								})
							}
						} else { // 不为空
							let defaultAddress = res.data.data.find(item => item.defaultAddress)
							if (!defaultAddress) { // 没有默认地址
								defaultAddress = res.data.data[0]
							}
							$self.placeOrderInfo = Object.assign($self.placeOrderInfo, {
								name: defaultAddress.name,
								mobile: defaultAddress.mobile,
								addressId: defaultAddress.id,
								address: defaultAddress.address,
								addressDetail: defaultAddress.addressDetail,
								longitude: defaultAddress.longitude,
								latitude: defaultAddress.latitude
							})
						}
					}
				})
			},
			// 查询红包数量
			queryPacket() {
				let uuid = uni.getStorageSync('uuid')
				if (!uuid) return
				uni.request({
					url: 'http://49.234.39.19:9022/red/packet/uuid',
					data: {
						uuid: uuid
					}
				}).then(infoRes => {
					let [err, res] = infoRes
					if (res.data && res.data.status === 1) {
						$self.placeOrderInfo.redUsable = res.data.data
					}
				}).catch(err => console.log(err))
			},
			// 切换 下单订单
			checkIndex(index) {
				this.activeIndex = index
			},
			// 下单提交按钮
			submitOrder(form) {
				let fields = {
					smallNum: { name: '小', type: 2 },
					middleNum: { name: '中', type: 1 }, 
					bigNum: { name: '大', type: 0 }
				}
				
				let orderDetailDtos = []
				for (let field of Object.keys(fields)) {
					let obj = {}
					obj.classifyCount = this.placeOrderInfo[field]
					obj.classifyName = fields[field].name
					obj.classifyType = fields[field].type
					orderDetailDtos.push(obj)
				}
				let param = {
					addressId: this.placeOrderInfo.addressId,
					addressName: `${this.placeOrderInfo.address} ${this.placeOrderInfo.addressDetail}`,
					latitude: this.placeOrderInfo.latitude,
					longitude: this.placeOrderInfo.longitude,
					mobile: this.placeOrderInfo.mobile,
					orderDetailDtos: orderDetailDtos,
					redId: 0,
					remark: this.placeOrderInfo.remark,
					userName: this.placeOrderInfo.name,
					userUuid: this.uuid
				}
				uni.request({
					url: 'http://49.234.39.19:9022/order/addOrder',
					method: 'POST',
					data: param
				})
					.then(data => {
						let [err, res] = data
						console.log(data)
					})

				this.ordering = 1
			},
			// 取消订单
			cancelOrder() {
				this.ordering = 0
			},
			// 继续下单
			continueOrder() {
				this.ordering = 0
			},
			goAddSetting() {
				uni.navigateTo({
					url: '../order/addressSetting/addressSetting'
				})
			},
			// 抢单按钮分发事件
			grab() {
				this.grabTipsShow = true
			},
			// 继续抢单
			goContinue() {
				this.grabTipsShow = false
			},
			// 查看抢到订单明细
			checkDetail(item) {
				this.orderDetailShow = true
				this.curOrderDetail = Object.assign ({}, {
					user: 'Lumir Sacharov',
					mobile: '17654564356',
					address: '逸仙路2816号 华滋奔腾大厦B座',
					bigNum: 1,
					smallNum: 2,
					time: 190,
					remark: ''
				})
			},
			// 关闭详情
			closeDetail() {
				this.orderDetailShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-wrapper {
		width: 100%;
		height: 100%;
		overflow: auto;
		.header {
			position: relative;
			height: 182rpx;
			background-color: #1DA06E;
			display: flex;
			box-shadow: 0px 1px 0px 0px rgba(136,136,136,0.25);
			.item {
				width: 50%;
				font-size: 32rpx;
				line-height: 36rpx;
				padding: 24rpx 0 4rpx;
				text-align: center;
				color: #fff;
				&.active {
					font-weight: 600;
				}
				&.active .text {
					border-bottom: 6rpx solid #fff;
				}
			}
		}
		.content {
			margin-top: 95rpx;
			padding: 0 30rpx;
			overflow: auto;
		}
		.mask {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background:rgba(0,0,0,0.4);
			z-index: 10;
			.middle {
				position: relative;
				width: 72%;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #fff;
				border-radius: 26rpx;
				&.order-info {
					height: 330rpx;
					.suc-pic {
						width: 60rpx;
						height: 60rpx;
						margin: 0 auto 20rpx;
						line-height: 60rpx;
						background-color: #F7B500;
						color: #fff;
						font-size: 32rpx;
						font-weight: consolas;
						text-align: center;
						border-radius: 50%;
					}
					.suc-txt {
						font-size: 36rpx;
						line-height: 44rpx;
						color: #030303;
					}
					.next {
						display: flex;
						justify-content: center;
						margin-top: 36rpx;
						.btn {
							box-sizing: border-box;
							width: 140rpx;
							height: 48rpx;
							line-height: 48rpx;
							font-size: 28rpx;
							text-align: center;
							margin-right: 20rpx;
							border-radius: 10rpx;
						}
						.cancel {
							color: #7F7C7F;
							border: 2rpx solid #DCDCDC;
						}
						.continue {
							background:#1DA06E;
							color: #fff;
							border: 2rpx solid #1DA06E;
						}
					}
				}
				&.grab-suc {
					// height: 398rpx;
					// padding: 0 36rpx;
					box-sizing: border-box;
					.title {
						box-sizing: border-box;
						width: 100%;
						height: 96rpx;
						padding: 0 36rpx;
						display: flex;
						align-items: center;
						border-bottom: 2rpx solid #E0E0E0;
						font-size: 28rpx;
						color: #808080;
						.funnel {
							width: 40rpx;
							height: 43rpx;
						}
						.txt{
							flex: 1;
							display: flex;
							align-items: center;
							.time {
								margin: 0 10rpx;
								font-family: PingFangSC-Semibold;
								font-size: 48rpx;
								color: #227656;
							}
						}
						.time {
							margin: 0 10rpx;
							font-family: PingFangSC-Semibold;
							font-size: 48rpx;
							color: #227656;
						}
						.close {
							width: 30rpx;
							height: 30rpx;
						}
					}
					.detail {
						padding: 20rpx 36rpx;
						.item {
							display: flex;
							align-items: center;
							margin: 5rpx 0;
							.label {
								width: 120rpx;
								font-size: 24rpx;
								color: #808080;
							}
							.txt {
								flex: 1;
								font-size: 28rpx;
								line-height: 36rpx;
								color: #4A4A4A;
							}
						}
						
					}
				}
			}
		}
	}
</style>
