<template>
	<view class="myorder-wrapper">
		<order-item v-for="order in orderList" :orderItem="order" :key="order.id"></order-item>
	</view>
</template>

<script>
	import OrderItem from '../../../components/orderItem.vue'

	export default {
		components: {
			'order-item': OrderItem
		},
		data() {
			return {
				orderList: [
					{
						location: '逸仙路2816号 华滋奔腾大厦B座',
						date: '2019-01-10 11:11',
						amount: 30,
						type: 0,
						id: 0
					},
					{
						location: '逸仙路2816号 华滋奔腾大厦B座',
						date: '2019-01-10 11:11',
						amount: 30,
						type: 1,
						id: 1
					},
					{
						location: '逸仙路2816号 华滋奔腾大厦B座',
						date: '2019-01-10 11:11',
						amount: 30,
						type: 2,
						id: 2
					},
					{
						location: '逸仙路2816号 华滋奔腾大厦B座',
						date: '2019-01-10 11:11',
						amount: 30,
						type: 3,
						id: 3
					}
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.myorder-wrapper {
		padding: 36rpx 36rpx 0;
		overflow: auto;
	}
</style>
