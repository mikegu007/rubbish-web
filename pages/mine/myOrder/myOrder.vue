<template>
	<view class="myorder-wrapper">
		<order-item v-for="order in orderList" :orderItem="order" :key="order.id"></order-item>
	</view>
</template>

<script>
	import OrderItem from '../../../components/orderItem.vue'

	let $self
	export default {
		components: {
			'order-item': OrderItem
		},
		data() {
			return {
				uuid: '',
				curIndex: 0,
				orderList: [
					// {
					// 	addressName: '逸仙路2816号 华滋奔腾大厦B座',
					// 	date: '2019-01-10 11:11',
					// 	amount: 30,
					// 	type: 0,
					// 	id: 0
					// }
				]
			};
		},
		onReady() {
			$self = this
			this.uuid = uni.getStorageSync('uuid')
			this.getOrderList()
		},
		methods: {
			getOrderList() {
				uni.request({
					url: 'https://messagecome.com/order/myOrders',
					method: 'POST',
					data: {
						"length": 10,
						"start": $self.curIndex,
						"uuid": $self.uuid
					}
				})
				.then(infoRes => {
					let [err, res] = infoRes
					console.log(res)
					if (res.data && res.data.data) {
						$self.formatList(res.data.data)
						$self.orderList = res.data.data
					}
				})
			},
			formatList(list) {
				list && list.forEach(item => {
					// type为1为抢单， type为0是下单
					if (item.workUuid === $self.uuid) {
						item.type = 1
					} else {
						item.type = 0
					}
					let total = 0
					// 计算订单金额
					if (item.orderDetailVos) {
						item.orderDetailVos.forEach(classify => {
							if (classify.classifyType === 2) {
								total += 3 * classify.classifyCount
							} else if (classify.classifyType === 1) {
								total += 5 * classify.classifyCount
							} else if (classify.classifyType === 0) {
								total += 7 * classify.classifyCount
							}
						})
					}
					item.total = total
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myorder-wrapper {
		padding: 36rpx 36rpx 0;
		overflow: auto;
	}
</style>
