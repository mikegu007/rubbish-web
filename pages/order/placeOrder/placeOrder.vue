// 下单
<template name="place-order">
	<view class="place-order-wrapper">
		<!-- 定位信息 -->
		<view class="location">
			<view class="info">
				<view class="address">
					<text class="road">{{ placeOrderInfo.address || '' }}</text>
					<text class="build">{{ placeOrderInfo.addressDetail || '' }}</text>
				</view>
				<view class="personal">
					<text class="name">{{ placeOrderInfo.name || '' }}</text>
					<text class="moblie">{{ placeOrderInfo.mobile || '' }}</text>
				</view>
			</view>
			<image class="indictor extend-click" src="/static/images/arrow-right.png" @tap="goSearch"></image>
		</view>
		<!-- 订单内容 -->
		<view class="place-order-content">
			<view class="item-box">
				<view class="item">
					<view class="left">支付方式</view>
					<view class="pay-type">在线支付</view>
				</view>
			</view>
			<view class="item-box detail">
				<view class="item" v-for="pack in packages" :key="pack.field">
					<view class="left">{{ pack.title }}</view>
					<view class="pay-type">
						<number v-model="placeOrderInfo[pack.field]" :field="pack.field" @increase="increaseNum" @change="changeNum"></number>
					</view>
				</view>
				<view class="item">
					<view class="left">红包</view>
					<view class="pay-type" v-if="placeOrderInfo.redUsable > 0">
						<view class="red-package" @tap="goMyRedPackage">
							<text class="red-usable">{{ placeOrderInfo.redUsable }}个可用</text>
							<image class="indictor" src="/static/images/arrow-right.png"></image>
						</view>
					</view>
				</view>
				<view class="item discount">
					<view class="left discount-label">已优惠<text class="discount-num">¥{{ placeOrderInfo.discount }}</text></view>
					<view class="pay-type">
						<view class="total-txt">小计<text class="total-num">¥{{ placeOrderInfo.total }}</text></view>
					</view>
				</view>
			</view>
			<view class="item-box remark">
				<view class="item" @tap="goRemark">
					<view class="left">订单备注</view>
					<view class="pay-type">
						<image class="indictor" src="/static/images/arrow-right.png"></image>
					</view>
				</view>
			</view>
			<!-- <view class="tips">
				<v-checkbox class="chk" @check="checkStatus"></v-checkbox>允许工作人员在30分钟内通过手机号联系我
			</view> -->
			<view class="submit" @tap="submitOrder">提交</view>
		</view>
	</view>
</template>

<script>
	import Number from '../../../components/number.vue'
	import vCheckbox from '../../../components/vCheckbox.vue'
	import { REFRESH_REMARK, REFRESH_ORDERLIST } from '../../../utils/constant.js'
	import { getRandomString, genSign } from '../../../utils/methods.js'
	// import GenOrder from '../genOrder/genOrder.vue'

	let $self
	export default {
		name: 'place-order',
		components: {
			// 'gen-order': GenOrder,
			'number': Number,
			'v-checkbox': vCheckbox
		},
		data() {
			return {
				// 袋子
				packages: [
					{ title: '小型袋子', field: 'smallNum' },
					{ title: '中型袋子', field: 'middleNum' },
					{ title: '大型袋子', field: 'bigNum' }
				],
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
				}
			}
		},
		onReady() {
			$self = this
			this.loadHandle()
			// 监听备注字段的刷新
			this.$eventBus.$on(REFRESH_REMARK, this.refreshRemark)
			this.$eventBus.$on(REFRESH_ORDERLIST, () => {
				this.loadHandle()
			})
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
					url: 'https://messagecome.com/red/packet/uuid',
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
			// 去定位界面
			goSearch() {
				uni.navigateTo({
					url: '../../mine/search/search'
				})
			},
			refreshRemark(remark) {
				this.placeOrderInfo.remark = remark
			},
			// 加载
			loadHandle() {
				let uuid = uni.getStorageSync('uuid')
				this.uuid = uuid ? uuid : ''
				this.queryAddList()
				this.queryPacket()
			},
			increaseNum(opt) {
				// console.log(opt)
				this.placeOrderInfo[opt.field] += opt.index
				this.calcTotal()
			},
			changeNum(opt) {
				// console.log(opt)
				this.placeOrderInfo[opt.field] += Number(opt.val)
				this.calcTotal()
			},
			checkStatus(active) {
				this.placeOrderInfo.allowed = active
			},
			// 计算总量
			calcTotal() {
				this.placeOrderInfo.total = this.placeOrderInfo.smallNum * 3 + this.placeOrderInfo.middleNum * 5 + this.placeOrderInfo.bigNum * 7
			},
			// 查看我的红包信息
			goMyRedPackage() {
				uni.navigateTo({
					url: '../mine/myRedPackage/myRedPackage'
				})
			},
			// 添加备注
			goRemark() {
				uni.navigateTo({
					url: `../order/remark/remark?remark=${this.placeOrderInfo.remark}`
				})
			},
			// 与订单号
			queryWxOrderNo() {
				uni.request({
					url: 'https://messagecome.com/wx/payCallback',
					method: 'POST'
				})
					.then(infoRes => {
						let [err, res] = infoRes
						console.log(infoRes)
						if (res.data && res.data.status === 1) {
						}
					})
			},
			// 提交订单
			submitOrder() {
				// if (!this.placeOrderInfo.smallNum || !this.placeOrderInfo.middleNum || !this.placeOrderInfo.bigNum) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请至少选择一个袋子',
				// 		duration: 1000
				// 	})
				// 	return
				// }
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
					url: 'https://messagecome.com/order/addOrder',
					method: 'POST',
					data: param
				})
					.then(data => {
						let [err, res] = data
						console.log(data)
						if (res.data && res.data.status === 1) {
							$self.queryWxOrderNo()
							// $self.$emit('submit')
							// let payParams = {
							// 	provider: 'wxpay',
							// 	timeStamp: String(+new Date()),
							// 	nonceStr: getRandomString(16),
							// 	package: 'prepay_id=',
							// 	signType: 'MD5'
							// }
							// let paySign = genSign(payParams)
							// Object.assign(payParams, { paySign })
							// uni.requestPayment(payParams)
						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
.place-order-wrapper {
	.location {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 92%;
		height: 160rpx;
		padding: 0 30rpx;
		position: absolute;
		left: 4%;
		top: 90rpx;
		box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(33,33,33,0.1);
		border-radius: 8rpx;
		background-color: #fff;
		.info {
			flex: 1;
			.address {
				font-size: 32rpx;
				color: #4A4A4A;
				line-height: 40rpx;
				margin-bottom: 8rpx;
			}
			.personal {
				font-size: 28rpx;
				color: #808080;
				line-height: 36rpx;
				.name {
					margin-right: 20rpx;
				}
			}
		}
	}
	.place-order-content {
		margin-top: 95rpx;
		padding: 0 30rpx;
		overflow: auto;
		.detail {
			margin-top: 20rpx;
		}
		.item-box {
			background-color: #fff;
			padding: 0 30rpx;
			&.remark {
				margin-top: 20rpx;
			}
			.item {
				height: 88rpx;
				display: flex;
				align-items: center;
				background-color: #fff;
				border-radius: 4rpx;
				font-size: 28rpx;
				&.discount {
					border-top: 2rpx solid #E0DEDE;
				}
				.left {
					flex: 1;
					font-size: 30rpx;
					&.discount-label {
						margin-left: 10rpx;
						color: #8E8E8E;
						font-size: 24rpx;
						.discount-num {
							margin-left: 10rpx;
							font-size: 30rpx;
						}
					}
				}
				.pay-type {
					display: flex;
					color: #FA6400;
					font-size: 30rpx;
					.red-package {
						display: flex;
						align-items: center;
						width: 115rpx;
						.red-usable {
							width: 92rpx;
							height: 30rpx;
							margin-right: 8rpx;
							line-height: 30rpx;
							font-size: 24rpx;
							text-align: center;
							border-radius: 4rpx;
							background-color: #F96806;
							color: #fff;
						}
					}
					.total-txt {
						font-size: 24rpx;
						color: #4A4A4A;
						.total-num {
							margin-left: 10rpx;
							font-weight: Helvetica Neue Medium;
							font-size: 34rpx;
							color: #4A4A4A;
						}
					}
				}
			}
		}
		.tips {
			display: flex;
			align-items: center;
			margin: 20rpx 0 54rpx;
			font-size: 32rpx;
			color: #8E8E8E;
			.chk {
				margin-right: 10rpx;
			}
		}
		.submit {
			margin-top: 20rpx;
		}
	}
}	
</style>
