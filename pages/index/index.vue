<template>
	<view class="index">
		<view class="header">
			<!-- <image class="main-bg" v-if="curHours >= 6 && curHours < 18" src="../../static/images/day-time.png"></image> -->
			<!-- <image class="main-bg" v-else src="/static/images/night-time.png"></image> -->
			<image class="main-bg" src="/static/images/night-time.png"></image>
			<!-- <view class="main-bg"></view> -->
			<view class="circles">
				<view class="circle strategy extend-click" @tap="goStrategy">
					<image class="img" src="../../static/images/strategy.png" ></image>
					<text class="text">攻略</text>
				</view>
				<view class="circle task extend-click" @tap="openTasks">
					<image class="img" src="../../static/images/task.png" ></image>
					<text class="text">任务</text>
				</view>
				<view class="circle notify extend-click" @tap="goNotify">
					<image class="img" src="../../static/images/notify.png" ></image>
					<text class="text">通知</text>
				</view>
			</view>
		</view>
		<view v-if="!showTasks" class="content">
			<!-- 最新动态 -->
			<view class="rank recent-news">
				<view class="title">
					<text class="main-title">最新动态</text>
				</view>
				<pics-list class="pics-list" :picsList="picsList"></pics-list>
				<updatings-list :updatingsList="updatingsList"></updatings-list>
				<view class="btn more-updatings" @tap="goUpdatings">查看更多动态</view>
			</view>
			<!-- 排行榜 -->
			<view class="rank">
				<view class="title">
					<text class="main-title">排行榜</text>
					<text class="sub-title">好友排名23名</text>
				</view>
				<rank-list class="rank-list" :ranks="rankList" :showLen="5"></rank-list>
				<view class="btn" @tap="goRank">查看更多好友</view>
			</view>
			<!-- 加好友 收能量 -->
			<view class="rank friends">
				<view class="title">
					<text class="main-title">加好友 收能量</text>
				</view>
				<friends :friendsList="friendsList"></friends>
			</view>
		</view>
		<view v-else class="task-wrapper">
			<view class="title">
				<text class="text">任务</text>
				<image class="close extend-click" src="/static/images/close.png" @tap="closeTasks"></image>
			</view>
			<view class="task-list">
				<task-item v-for="taskItem in taskList" :item="taskItem" :key="taskItem.id"></task-item>
			</view>
		</view>
	</view>
</template>

<script>
	import RankList from '../../components/rankList.vue'
	import Friends from '../../components/friends.vue'
	import UpdatingsList from '../../components/updatingsList.vue'
	import PicsStateList from '../../components/picsStateList.vue'
	import TaskItem from '../../components/taskItem.vue'
	
	export default {
		components: {
			'rank-list': RankList,
			'friends': Friends,
			'updatings-list': UpdatingsList,
			'pics-list': PicsStateList,
			'task-item': TaskItem
		},
		data() {
			return {
				curHours: 8,
				showTasks: false,
				rankList: [
					{name: 'Huo Shu', level: '55', avator: '../static/images/user.png', id: 1},
					{name: 'Huo Shu', level: '50', avator: '../static/images/user.png', id: 2},
					{name: 'Huo Shu', level: '45', avator: '../static/images/user.png', id: 3},
					{name: 'Huo Shu', level: '44', avator: '', id: 4},
					{name: 'Huo Shu', level: '43', avator: '', id: 5},
					{name: 'Huo Shu', level: '42', avator: '', id: 6},
					{name: 'Huo Shu', level: '41', avator: '', id: 7}
				],
				friendsList: [
					{name: 'Harry', avator: '../static/images/friends.png', id: 1},
					{name: 'Harry', avator: '../static/images/friends.png', id: 2},
					{name: 'Harry', avator: '../static/images/friends.png', id: 3},
					{name: 'Harry', avator: '../static/images/friends.png', id: 4},
					{name: 'Harry', avator: '../static/images/friends.png', id: 5}
				],
				picsList: [
					{num: '7g', avator: '../static/images/user.png', id: 1},
					{num: '1.8kg', avator: '../static/images/user.png', id: 2},
					{num: '7g', avator: '../static/images/user.png', id: 3},
					{num: '1.8kg', avator: '../static/images/user.png', id: 4},
					{num: '7g', avator: '../static/images/user.png', id: 5},
					{num: '1.8kg', avator: '../static/images/user.png', id: 6}
				],
				updatingsList: [
					{name: 'Huo Shu', content: '收取了7g', date: '1小时前', id: 1},
					{name: 'Huo Shu', content: '收取了7g', date: '1小时前', id: 2},
					{name: 'Huo Shu', content: '收取了7g', date: '1小时前', id: 3},
					{name: 'Huo Shu', content: '收取了7g', date: '1小时前', id: 4}
				],
				taskList: [
					{type: 0, title: '连续收能量7天', completed: 3, total: 7, id: 1},
					{type: 0, title: '一周帮助好友收能量10次', completed: 3, total: 7, id: 2},
					{type: 1, title: '一周帮助好友阻止二恶英5次', completed: 3, total: 7, id: 3}
				]
			}
		},
		onReady() {
			this.curHours = new Date().getHours();
		},
		methods: {
			goStrategy() {
				uni.navigateTo({
					url: '../index/strategy/strategy'
				})
			},
			openTasks() {
				this.showTasks = true
				uni.hideTabBar()
			},
			closeTasks() {
				this.showTasks = false
				uni.showTabBar()
			},
			goNotify() {
				uni.navigateTo({
					url: '../index/notify/notify'
				})
			},
		 	async getLocation() {
				uni.navigateTo({
					url: '../map/map'
				})
			},
			goRank() {
				uni.navigateTo({
					url: '../index/rank/rank'
				})
			},
			goUpdatings() {
				uni.navigateTo({
					url: '../index/updatings/updatings'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		width: 100%;
		overflow: auto;
		.header {
			display: flex;
			position: relative;
			.main-bg {
				width: 750rpx;
				height: 1110rpx;
			}
			.circles {
				position: absolute;
				right: 32rpx;
				bottom: 45rpx;
				display: flex;
				.circle {
					width: 82rpx;
					height: 82rpx;
					border-radius: 50%;
					color: #fff;
					font-size: 24rpx;
					margin-left: 36rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.img {
						width: 27rpx;
						height: 27rpx;
						overflow: inherit;
					}
					.text {
						height: 32rpx;
						line-height: 32rpx;
					}
					&.strategy {
						border: 4rpx solid #6195E4;
						background-color: #8ED7FF;
					}
					&.task {
						border: 4rpx solid #78AB1C;
						background-color: #BCE24C;
					}
					&.notify {
						border: 4rpx solid #DA9C00;
						background-color: #FFCF1A;
					}
				}
			}
		}
		.content {
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			margin: -32rpx 0 60rpx;
			padding: 0 32rpx;
			border-radius: 20rpx 20rpx 0 0;
			background-color: #F8F8F8;
			.rank {
				&.recent-news .title {
					margin-top: 0rpx;
				}
				.title {
					display: flex;
					margin: 42rpx 0 20rpx;
					line-height: 48rpx;
					.main-title {
						flex: 1;
						color: #4A4A4A;
						font-size: 40rpx;
						font-family: PingFangSC-Medium;
						font-weight: 500;
					}
					.sub-title {
						color: #787878;
						font-size: 32rpx;
					}
				}
				.pics-list {
					margin-top: 28rpx;
				}
				.more-updatings {
					border-radius: 0 0 4rpx 4rpx;
					border-top: 2rpx solid #E0E0E0;
				}
			}
			.recent-news {
				margin-top: 42rpx;
			}
		}
		.task-wrapper {
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			margin-top: -470rpx;
			border-radius: 20rpx 20rpx 0 0;
			background-color: #F8F8F8;
			.title {
				position: relative;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				.close {
					position: absolute;
					width: 30rpx;
					height: 30rpx;
					right: 30rpx;
					top: 33rpx;
					color: #C0C0C0;
					font-family: consolas;
				}
				.text {
					font-size: 32rpx;
					font-family: PingFangSC-Medium;
					font-weight: 700;
				}
			}
			.task-list {
				padding: 36rpx 30rpx;
			}
		}
	}
</style>
