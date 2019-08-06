<template name="address-item">
	<view class="address">
		<view class="detail">
			<image v-if="item.isCur" class="address-img" src="/static/images/cur-address.png"></image>
			<view class="info">
				<view class="buildings">华滋奔腾大厦</view>
				<view class="road">逸仙路2816号 B栋12楼</view>
				<view class="personal">
					<text>Sofie Hubert</text>
					<text>18233409878</text>
				</view>
			</view>
		</view>
		<view class="edit" @tap="edit">编辑</view>
	</view>
</template>

<script>
	export default {
		name: 'address-item',
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {
				
			};
		},
		onReady() {
			console.log(this.item);
		},
		methods: {
			edit() {
				this.$emit('eidt', this.item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address {
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		padding: 30rpx;
		background-color: #fff;
		box-shadow: 0px 2rpx 6rpx 2rpx rgba(0,0,0,0.06);
		border-radius: 8rpx;
		.edit {
			height: 36rpx;
			padding-left: 20rpx;
			font-size: 32rpx;
			line-height: 36rpx;
			color: rgba(152,152,152,1);
			border-left: 2rpx solid #E0E0E0;
		}
		.detail {
			flex: 1;
			display: flex;
			.address-img {
				width: 28rpx;
				height: 34rpx;
				margin: 5rpx 24rpx 0 0;
			}
			.info {
				flex: 1;
				.buildings {
					color: rgba(74,74,74,1);
					font-size: 32rpx;
					line-height: 42rpx;
				}
				.road {
					font-weight:400;
					color: rgba(102,102,102,1);
					font-size: 28rpx;
					line-height: 36rpx; 
				}
				.personal {
					color: rgba(162,162,162,1);
					line-height: 30rpx;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
