<template>
	<view class="rank-wrapper">
		<rank-list :ranks="rankList" :showLen="10"></rank-list>
	</view>
</template>

<script>
	import RankList from '../../../components/rankList.vue'
	
	export default {
		components: {
			'rank-list': RankList,
		},
		data() {
			return {
				rankList: [
					{name: 'Huo Shu', level: '55', avator: '../static/images/user.png'},
					{name: 'Huo Shu', level: '50', avator: '../static/images/user.png'},
					{name: 'Huo Shu', level: '45', avator: '../static/images/user.png'},
					{name: 'Huo Shu', level: '44', avator: ''},
					{name: 'Huo Shu', level: '43', avator: ''},
					{name: 'Huo Shu', level: '42', avator: ''},
					{name: 'Huo Shu', level: '41', avator: ''}
				],
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rank-wrapper {
		padding: 36rpx 30rpx 0;
	}
</style>
