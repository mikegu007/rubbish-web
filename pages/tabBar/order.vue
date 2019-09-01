<template>
	<view class="order-wrapper">
		<view class="header">
			<view class="item" :class="{'active': activeIndex === $index}" v-for="(order, $index) in orderArr" :key="order.type" @tap="checkIndex($index)">
				<text class="text">{{ order.text }}</text>
			</view>
		</view>
		<place-order v-if="activeIndex === 0 && ordering" @submit="submit"></place-order>
		<!-- 取消订单 -->
		<gen-order v-else-if="activeIndex === 0 && !ordering" @cancel="cancelOrder" @continue="continueOrder"></gen-order>
		<grab-order v-else-if="activeIndex === 1"></grab-order>
	</view>
</template>

<script>
	import PlaceOrder from '../order/placeOrder/placeOrder.vue'
	import GenOrder from '../order/genOrder/genOrder.vue'
	import GrabOrder from '../order/grabOrder/grabOrder.vue'
	import { REFRESH_ORDERING, REFRESH_ORDERLIST } from '../../utils/constant.js'

	let $self;
	export default {
		components: {
			'place-order': PlaceOrder,
			'grab-order': GrabOrder,
			'gen-order': GenOrder
		},
		data() {
			return {
				ordering: true,
				orderArr: [ // 顶部tab
					{ type: 0, text: '下单' },
					{ type: 0, text: '抢单' }
				],
				activeIndex: 0, // 0 下单 1 抢单
			};
		},
		onReady() {
			this.$eventBus.$on(REFRESH_ORDERING, this.refreshOrderStatus)
		},
		onShow() {
			this.$eventBus.$emit(REFRESH_ORDERLIST)
		},
		methods: {
			// 切换 下单 订单
			checkIndex(index) {
				this.activeIndex = index
			},
			// 下单
			submit() {
				this.ordering = false
			},
			// 取消订单
			cancelOrder() {
				uni.navigateTo({
					url: '../order/cancelOrder/cancelOrder'
				})
			},
			// 继续下单
			continueOrder() {
				this.ordering = true
			},
			refreshOrderStatus() {
				this.ordering = true
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
	}
</style>
