<template>
	<view class="feedback">
		<view class="header">
			<text class="text">意见主题</text>
			<image class="img" src="/static/images/arrow-down.png"></image>
		</view>
		<view class="content">
			<view class="suggest">
				<textarea v-model="content" class="textarea" placeholder="请填写10个字以上的问题描述，以便我们提供更好的帮助！"/>
			</view>
			<!-- <view class="picture">
				<view class="title">
					相关截图(选填)
				</view>
				<view class="upload">
					<image class="upload-pic" src="/static/images/add-picture.png"></image>
				</view>
			</view> -->
		</view>
		<view class="supply">
			<view class="tip">输入有效联系方式以便开发者联系你</view>
			<view class="contact">
				<text class="label">联系方式</text>
				<input class="ipt" v-model="mobile" name="name" placeholder="手机号/邮箱" />
			</view>
			<!-- <view class="chkbox">
				<v-checkbox class="chk" @check="checkStatus"></v-checkbox>允许开发者在48小时内通过客服消息联系我
			</view> -->
		</view>
		<view class="submit" @tap="submit">提交</view>
	</view>
</template>

<script>
	import vCheckbox from '../../../../components/vCheckbox'

	export default {
		components: { 
			'v-checkbox': vCheckbox
		 },
		data() {
			return {
				form: {
					active: false,
					appInfo: '',
					content: '',
					mobile: ''
				}
			};
		},
		onReady() {
			this.appInfo = uni.getStorageSync('appInfo')
		},
		methods: {
			checkStatus(active) {
				this.form.active = active
			},
			submit() {
				if (!this.content.trim()) {
					uni.showToast({
						title: '请输入反馈内容',
						icon: 'none'
					})
					return
				} else if (!this.mobile.trim()) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
					return
				}
				let param = {
					openId: this.appInfo.openid,
					content: `${this.content};${this.mobile}`
				}
				uni.request({
					url: 'https://messagecome.com/feed/back/add',
					data: param,
					method: 'POST'
				}).then(infoRes => {
					let [err, res] = infoRes
					if (res.data && res.data.status === 1) {
						uni.showToast({
							title: '提交成功',
							duration: 2000,
							success() {
								uni.navigateBack({})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedback {
		padding : 36rpx 30rpx 0;
		.header {
			display: flex;
			align-items: center;
			height: 88rpx;
			padding: 0 36rpx;
			background-color: #fff;
			box-shadow: 0px 2rpx 6rpx 0px rgba(0,0,0,0.06);
			border-radius: 4rpx;
			.text {
				flex: 1;
				font-size: 32rpx;
			}
			.img {
				width: 26rpx;
				height: 16rpx;
			}
		}
		.content {
			margin-top: 20rpx;
			padding: 36rpx;
			background-color: #fff;
			.suggest {
				display: flex;
				padding-bottom: 36rpx;
				border-bottom: 2rpx solid #E0E0E0;
				.textarea {
					height: 200rpx;
					font-size: 28rpx;
					line-height: 36rpx;
					color: #989898;
				}
			}
			.picture {
				.title {
					height: 40rpx;
					line-height: 40rpx;
					margin: 24rpx 0;
					font-size: 28rpx;
				}
				.upload {
					display: flex;
					.upload-pic {
						width: 128rpx;
						height: 128rpx;
					}
				}
			}
		}
		.supply {
			margin: 36rpx 0 54rpx; 
			.tip, .chkbox {
				line-height: 36rpx;
				font-size: 32rpx;
				color:rgba(128,128,128,1)
			}
			.tip {
				margin-bottom: 10rpx;
			}
			.chkbox {
				height: 36rpx;
				display: flex;
				align-items: center;
				.chk {
					margin-right: 10rpx;
					vertical-align: middle;
				}
			}
			.contact {
				display: flex;
				align-items: center;
				height: 90rpx;
				margin: 10rpx 0;
				padding: 0 36rpx;
				line-height: 90rpx;
				background-color: #fff;
				box-shadow: 0px 2rpx 6rpx 0px rgba(0,0,0,0.06);
				border-radius: 4rpx;
				.label {
					width: 130rpx;
					margin-right: 30rpx;
					text-align: left;
					font-size: 32rpx;
					color: #4A4A4A;
				}
				.ipt {
					flex: 1;
					font-size: 28rpx;
					color: #808080;
				}
			}
		}
	}
</style>
