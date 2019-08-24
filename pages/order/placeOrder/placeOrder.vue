// 下单
<template name="place-order">
	<view class="place-order-wrapper">
		<view class="item-box">
			<view class="item">
				<view class="left">支付方式</view>
				<view class="pay-type">在线支付</view>
			</view>
		</view>
		<view class="item-box detail">
			<view class="item">
				<view class="left">小型袋子</view>
				<view class="pay-type">
					<number v-model="item.smallNum" @change="changeSmall"></number>
				</view>
			</view>
			<view class="item">
				<view class="left">中型袋子</view>
				<view class="pay-type">
					<number v-model="item.middleNum" @change="changeSmall"></number>
				</view>
			</view>
			<view class="item">
				<view class="left">大型袋子</view>
				<view class="pay-type">
					<number v-model="item.bigNum" @change="changeBig"></number>
				</view>
			</view>
			<view class="item">
				<view class="left">红包</view>
				<view class="pay-type" v-if="item.redUsable > 0">
					<view class="red-package" @tap="goMyRedPackage">
						<text class="red-usable">{{ item.redUsable }}个可用</text>
						<image class="indictor" src="/static/images/arrow-right.png"></image>
					</view>
				</view>
			</view>
			<view class="item discount">
				<view class="left discount-label">已优惠<text class="discount-num">¥{{ item.discount }}</text></view>
				<view class="pay-type">
					<view class="total-txt">小计<text class="total-num">¥{{ item.total }}</text></view>
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
		<view class="submit" @tap="submit">提交</view>
	</view>
</template>

<script>
	import Number from '../../../components/number.vue'
	import vCheckbox from '../../../components/vCheckbox.vue'
	import { REFRESH_REMARK } from '../../../utils/constant.js'
	
	// let $self
	export default {
		name: 'place-order',
		props: {
			item: {
				type: Object
			}
		},
		components: {
			number: Number,
			'v-checkbox': vCheckbox
		},
		onReady() {
			this.$eventBus.$on(REFRESH_REMARK, this.refreshRemark)
		},
		methods: {
			refreshRemark(remark) {
				this.item.remark = remark
			},
			changeSmall(index) {
				this.item.smallNum += index
				this.calcTotal()
			},
			changeMiddle(index) {
				this.item.middleNum += index
				this.calcTotal()
			},
			changeBig(index) {
				this.item.bigNum += index
				this.calcTotal()
			},
			checkStatus(active) {
				this.item.allowed = active
			},
			calcTotal() {
				this.item.total = this.item.smallNum * 3 + this.item.middleNum * 5 + this.item.bigNum * 7
			},
			goMyRedPackage() {
				uni.navigateTo({
					url: '../mine/myRedPackage/myRedPackage'
				})
			},
			goRemark() {
				console.log(this.item)
				uni.navigateTo({
					url: `../order/remark/remark?remark=${this.item.remark}`
				})
			},
			submit() {
				this.$emit('submit', this.form)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.place-order-wrapper {
		// background-color: #fff;
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
	}
</style>
