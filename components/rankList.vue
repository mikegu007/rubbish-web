<template name="rank-list">
	<view class="rank-list">
		<view v-for="(rank, index) in ranks" v-if="ctrlLen && index < showLen" :key="rank.id" class="rank">
			<view :class="{'rank1': index === 0, 'rank2': index === 1, 'rank3': index === 2}" class="index">{{ index > 2 ? index + 1 : '' }}</view>
			<image class="avator" src="../static/images/user.png"></image>
			<text class="name">{{ rank.name }}</text>
			<text class="level">Lv.{{ rank.level }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'rank-list',
		data() {
			return {
			}
		},
		props: {
			ranks: {
				type: Array
			},
			ctrlLen: {
				type: Boolean,
				default: true
			},
			showLen: {
				type: Number,
				default: 5
			}
		},
		onReady() {
			// console.log(this.ranks)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.rank-list {
		width: 100%;
		display: flex;
		flex-direction: column; 
		.rank {
			width: 100%;
			height: 130rpx;
			display: flex;
			align-items: center;		
			margin-bottom: 20rpx;
			background-color: #fff;
			.index {
				width: 42rpx;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				margin: 0 20rpx 0 16rpx;
				font-size: 32rpx;
				font-family: DINCondensed-Bold;
				color: #808080;
				&.rank1 {
					background: url('../static/images/rank1.png') no-repeat;
					background-size: 100% 100%; 
				}
				&.rank2 {
					background: url('../static/images/rank2.png') no-repeat;
					background-size: 100% 100%; 
				}
				&.rank3 {
					background: url('../static/images/rank3.png') no-repeat;
					background-size: 100% 100%; 
				}
			}
			.avator {
				width: 82rpx;
				height: 82rpx;
				margin-right: 22rpx; 
				border-radius: 10rpx; 
			}
			.name {
				flex: 1;
				color: #4A4A4A;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold;
			}
			.level {
				margin-right: 46rpx;
				color: #808080;
				font-size: 36rpx;
				font-family: DINCondensed-Bold;
			}
		}
	}
</style>
