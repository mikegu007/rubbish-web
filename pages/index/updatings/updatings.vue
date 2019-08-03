<template>
	<view class="updateings-wrapper">
		<view class="title">今天</view>
		<updatings-list :showIcon="true" :updatingsList="updatingsList"></updatings-list>
	</view>
</template>

<script>
	import UpdatingsList from '../../../components/updatingsList.vue'
	
	export default {
		components: {
			'updatings-list': UpdatingsList
		},
		data() {
			return {
				updatingsList: [
					{name: 'Huo Shu', content: '收取了7g', date: '1小时前', id: 1},
					{name: 'Huo Shu', content: '收取了7g', date: '1小时前', id: 2},
					{name: 'Huo Shu', content: '收取了7g', date: '1小时前', id: 3},
					{name: 'Huo Shu', content: '收取了7g', date: '1小时前', id: 4}
				]
			};
		}
	}
</script>

<style lang="scss">
	.updateings-wrapper {
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: #fff;
		.title {
			padding-left: 30rpx;
			font-size: 40rpx;
			font-weight: 700;
			line-height: 80rpx;
		}
	}
</style>
