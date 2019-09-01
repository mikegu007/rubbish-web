<template name="address-item">
	<view class="address">
		<view class="detail" @tap="confirm">
			<image v-if="item.defaultAddress" class="address-img" src="/static/images/cur-address.png"></image>
			<view class="info">
				<view class="buildings">{{ item.address }}</view>
				<view class="road">{{ item.addressDetail }}</view>
				<view class="personal">
					<text>{{ item.name }}</text>
					<text>{{ item.mobile }}</text>
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
		},
		methods: {
			confirm() {
				this.$emit('confirm', this.item)
			},
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
		padding: 30rpx;
		background-color: #fff;
		box-shadow: 0px 2rpx 6rpx 2rpx rgba(0,0,0,0.06);
		border-radius: 8rpx;
		margin-bottom: 30rpx;
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
				margin: 6rpx 24rpx 0 0;
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
