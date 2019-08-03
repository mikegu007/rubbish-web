<template>
	<view class="notify-wrapper">
		<notify-item v-for="notify in notifyList" :item="notify" :key="item.id"></notify-item>
	</view>
</template>

<script>
	import NotifyItem from '../../../components/notifyItem.vue'

	export default {
		components: {
			'notify-item': NotifyItem
		},
		data() {
			return {
				notifyList: [
					{relation: '你的朋友', name: 'Jack Smith', content: '为你领取绿色能量', date: '2019-07-15 11:25', id: 1},
					{relation: '你的朋友', name: 'Jack Smith', content: '为你领取绿色能量', date: '2019-07-15 11:25', id: 2},
					{relation: '你的朋友', name: 'Jack Smith', content: '为你领取绿色能量', date: '2019-07-15 11:25', id: 3}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.notify-wrapper {
		padding: 36rpx 30rpx 0;
	}
</style>
