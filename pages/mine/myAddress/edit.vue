<template>
	<view class="address-edit">
		<view class="info">
			<view class="form-item">
				<text class="label">联系人</text>
				<input class="ipt" name="name" placeholder="请输入姓名" />
			</view>
			<view class="form-item">
				<text class="label">性别</text>
				<view class="group">
					<text class="radio active">先生</text>
					<text class="radio">女士</text>
				</view>
			</view>
			<view class="form-item">
				<text class="label">电话</text>
				<input class="ipt" name="mobile" placeholder="请输入电话" />
			</view>
			<view class="form-item">
				<text class="label">地址</text>
				<input class="ipt" name="address" placeholder="请输入地址" />
				<image class="indictor extend-click" src="../../../static/images/arrow-right.png"></image>
			</view>
			<view class="form-item last-item">
				<text class="label">门牌号</text>
				<input class="ipt" name="floor" placeholder="请输入门牌号" />
			</view>
			<view class="form-item">
				<text class="label">标签</text>
				<view class="group">
					<text class="radio active">家</text>
					<text class="radio">公司</text>
					<text class="radio">学校</text>
				</view>
			</view>
		</view>
		<view class="del" @click="delAddress">
			删除地址
		</view>
		<view class="submit">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			delAddress() {
				uni.showModal({
					title: '删除地址',
					content: '确认要删除改地址吗？',
					// showCancel: true,
					cancelColor: '#808080',
					confirmColor: '#1DA06E',
					success: function (res) {
						// console.log(res)
						if (res.confirm) {
							uni.navigateBack({})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address-edit {
		padding: 30rpx 30rpx 0;
		.info {
			// margin: 30rpx 30rpx 0;
			padding: 36rpx;
			border-radius: 8rpx;
			background-color: #fff;
			.form-item {
				display: flex;
				align-items: center;
				height: 76rpx;
				line-height: 76rpx;
				border-bottom: 2rpx solid #E0E0E0;
				&:last-child {
					border-bottom: 0;
				}
				.label {
					width: 120rpx;
					text-align: left;
					font-size: 32rpx;
					color: #4A4A4A;
				}
				.ipt {
					flex: 1;
					font-size: 28rpx;
					color: #808080;
				}
				.indictor {
					width: 16rpx;
					height: 26rpx;
				}
				.group {
					flex: 1;
					display: flex;
					align-items: center;
					.radio {
						width: 100rpx;
						height: 48rpx;
						margin-right: 20rpx;
						line-height: 48rpx;
						text-align: center;
						border-radius: 10rpx;
						border: 2rpx solid rgba(220,220,220,1);
						color: #808080;
						font-size: 30rpx;
						&.active {
							background-color: rgba(236,247,243,1);
							color: #1DA06E;
							border-color: rgba(194,229,216,1);
						}
					}
				}
			}
		}
		.del {
			height: 88rpx;
			line-height: 88rpx;
			font-size: 32rpx;
			margin: 36rpx 0 54rpx;
			padding-left: 36rpx;
			color: #E02020;
			border-radius: 8rpx;
			background-color: #fff;
		}
	}
</style>
