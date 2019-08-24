<template>
	<view class="address-edit">
		<view class="info">
			<view class="form-item">
				<text class="label">联系人</text>
				<input class="ipt" name="name" v-model="form.name" placeholder="请输入姓名" />
			</view>
			<view class="form-item">
				<text class="label">性别</text>
				<view class="group">
					<text class="radio" v-for="gender in genderArr" :class="{'active': form.gender === gender.gender}" :key="gender.gender" @tap="checkGender(gender)">{{ gender.label }}</text>
				</view>
			</view>
			<view class="form-item">
				<text class="label">电话</text>
				<input class="ipt" name="mobile" v-model="form.mobile" placeholder="请输入电话" />
			</view>
			<view class="form-item" @tap="checkAddress">
				<text class="label">地区</text>
				<view class="address">
					<view class="address-ipt" name="address">{{ form.address }}</view>
					<image class="indictor extend-click" src="/static/images/arrow-right.png"></image>
				</view>
			</view>
			<view class="form-item">
				<text class="label">地址</text>
				<input class="ipt" name="floor" v-model="form.addressDetail" placeholder="请输入门牌号" />
			</view>
			<view class="form-item">
				<text class="label">标签</text>
				<view class="group">
					<text class="radio" v-for="sign in signArr" :class="{'active': form.sign === sign.field}" :key="sign.field" @tap="checkSign(sign)">{{ sign.label }}</text>
				</view>
			</view>
			<view class="form-item">
				<view class="chk">
					<v-checkbox @check="setDefault"></v-checkbox>
					<text class="default">设为默认地址</text>
				</view>
			</view>
		</view>
		<view v-if="form.id" class="del" @click="delAddress">删除地址</view>
		<view class="submit" @tap="submit">确定</view>
	</view>
</template>

<script>
	import vCheckbox from '../../../components/vCheckbox.vue'

	let $self
	export default {
		components: {
			'v-checkbox': vCheckbox
		},
		data() {
			return {
				genderArr: [{ label: '男', gender: 1 }, { label: '女', gender: 0 }],
				signArr: [{ label: '家', field: 0 }, { label: '公司', field: 1 }, { label: '学校', field: 2 }],
				form: {
					name: '',
					gender: 1,
					mobile: '',
					address: '省份 城市 县区',
					addressDetail: '',
					latitude: '',
					longitude: '',
					sign: 0,
					defaultAddress: false
				},
				uuid: ''
			}
		},
		onLoad(options) {
			$self = this
			this.uuid = uni.getStorageSync('uuid')
			if (JSON.stringify(options) !== '{}') {
				let address = JSON.parse(decodeURIComponent(options.address))
				this.form = Object.assign({}, address)
			}
		},
		onShow() {
			let curAddress = uni.getStorageSync('curAddress')
			// console.log(curAddress)
			if (curAddress) {
				let tudeArr = curAddress.location.split(',')
				let latitude = tudeArr[0]
				let longitude = tudeArr[1]
				this.form = Object.assign(this.form, {
					latitude,
					longitude,
					address: curAddress.district,
					addressDetail: curAddress.name
				})
				uni.removeStorageSync('curAddress')
			}
		},
		methods: {
			checkGender(item) {
				this.form.gender = item.gender
			},
			checkSign(sign) {
				this.form.sign = sign.field
			},
			checkAddress() {
				uni.navigateTo({
					url: `../search/search?address=${this.form.addressDetail}`
				})
			},
			setDefault(defaultAdd) {
				this.form.defaultAddress = defaultAdd
			},
			submit() {
				let param = {
					address: this.form.address || '',
					addressDetail: this.form.addressDetail || '',
					defaultAddress: this.form.defaultAddress || '',
					latitude: this.form.latitude || '',
					longitude: this.form.longitude || '',
					mobile: this.form.mobile || '',
					name: this.form.name || '',
					sign: this.form.sign || '',
					userUuid: this.uuid
				}
				if (this.form.id) {
					param = Object.assign(param, {id: this.form.id})
				}

				uni.request({
					url: 'http://49.234.39.19:9022/user/address/edit',
					method: 'POST',
					data: param
				}).then(infoRes => {
					let [err, res] = infoRes
					if (res.data && res.data.status === 1) {
						let title = param.id ? '地址编辑成功' : '地址新增成功'
						uni.showToast({
							title: title,
							icon: 'success',
							duration: 1000
						})
						uni.navigateBack({})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.errMsg,
							duration: 1000
						});
					}
				})
			},
			delAddress() {
				uni.showModal({
					title: '删除地址',
					content: '确认要删除改地址吗？',
					cancelColor: '#808080',
					confirmColor: '#1DA06E',
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: 'http://49.234.39.19:9022/user/address/del',
								// method: 'POST',
								data: {id: $self.form.id || 0}
							}).then(infoRes => {
								let [err, res] = infoRes
								if (res.data && res.data.status === 1) {
									uni.showToast({
										title: '删除成功',
										icon: 'success',
										duration: 1000
									})
									uni.navigateBack({})
								}
							})
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
				box-sizing: border-box;
				display: flex;
				align-items: center;
				height: 90rpx;
				// line-height: 76rpx;
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
				.address {
					flex: 1;
					display: flex;
					align-items: center;
					color: #808080;
					font-size: 32rpx;
					.address-ipt {
						flex: 1;
					}
				}
				.ipt {
					flex: 1;
					font-size: 32rpx;
					color: #808080;
				}
				.indictor {
					margin-left: 20rpx;
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
				.chk {
					height: 36rpx;
					line-height: 36rpx;
					display: flex;
					align-items: center;
					.default {
						vertical-align: middle;
						margin-left: 10rpx;
						color: #808080;
						font-size: 32rpx;
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
		.selection {

		}
	}
</style>
