<template name="grab-order">
  <view class="grab-order-wrapper">
    <view class="location" @tap="goAddSetting">
      <view class="info">
        <view class="item">
          <text class="label">我的定位</text>
          <text class="text">{{ curLoaction.address }}</text>
        </view>
        <!-- <view class="item">
          <text class="label">抢单小区：</text>
          <text class="text">3个</text>
        </view> -->
      </view>
      <image class="indictor extend-click" src="/static/images/arrow-right.png"></image>
    </view>
    <grab-list :list="grabData" @grab="grab" @check-detail="checkDetail"></grab-list>
    <view class="mask" v-if="grabTipsShow || orderDetailShow">
			<view class="middle order-info" v-if="grabTipsShow">
				<image class="suc-pic" src="/static/images/success-orange.png"></image>
      	<view class="suc-txt">抢单成功</view>
				<view class="next">
					<view class="btn extend-click cancel" @tap="goDetail">查看订单</view>
					<view class="btn extend-click continue" @tap="goContinue">继续抢单</view>
				</view>
			</view>
			<view class="middle grab-suc" v-if="orderDetailShow">
				<view class="title">
					<image class="funnel" src="/static/images/funnel.png"></image>
					<view class="txt">
						<text class="time">
							{{ curOrderDetail.time | timeFilter }}
						</text>
						<text>倒计时</text>
					</view>
					<image class="close extend-click" src="/static/images/close.png" @tap="closeDetail"></image>
				</view>
				<view class="detail">
					<view class="item">
						<text class="label">用户名：</text>
						<text class="txt">{{ curOrderDetail.userName }}</text>
					</view>
					<view class="item">
						<text class="label">手机号：</text>
						<text class="txt">{{ curOrderDetail.mobile }}</text>
					</view>
					<view class="item">
						<text class="label">地址：</text>
						<text class="txt">{{ curOrderDetail.addressName }}</text>
					</view>
					<view class="item" v-if="curOrderDetail.bigNum">
						<text class="label">大型袋子：</text>
						<text class="txt">{{ curOrderDetail.bigNum }}袋</text>
					</view>
					<view class="item" v-if="curOrderDetail.middleNum">
						<text class="label">中型袋子：</text>
						<text class="txt">{{ curOrderDetail.middleNum }}袋</text>
					</view>
					<view class="item" v-if="curOrderDetail.smallNum">
						<text class="label">小型袋子：</text>
						<text class="txt">{{ curOrderDetail.smallNum }}袋</text>
					</view>
					<view class="item">
						<text class="label">备注：</text>
						<text class="txt">{{ curOrderDetail.remark }}</text>
					</view>
				</view>
			</view>
		</view>
  </view>
</template>

<script>
	import GrabList from '../../../components/grabList.vue'
	import amap from '../../../utils/amap'
	
	let $self
  export default {
    name: 'grab-order',
    components: {
      'grab-list': GrabList
    },
    data() {
      return {
				uuid: '', // 用户uuid
				userInfo: {}, // 用户信息
        grabTipsShow: false, // 抢单成功提示
        orderDetailShow: false, // 订单详情
        curLoaction: { // 当前经纬度
          longitude: '',
					latitude: '',
					address: ''
        },
        // 抢单列表
				grabData: [
					// { avator: '/static/images/user.png', location: '逸仙路2816号 华滋奔腾大厦B座', num: 3, type: 1, id: 0 }
        ],
        curOrderDetail: {}, // 当前订单明细
				curOrderNo: ''
      }
    },
    onReady() {
			$self = this
			this.uuid = uni.getStorageSync('uuid')
			this.userInfo = uni.getStorageSync('userInfo').userInfo
      this.getCurLocation()
    },
    methods: {
			goAddSetting() {
				let latitude2 = 22.674162
				let longtitude2 = 113.900034
				let name = 'hhhhhh'
				let desc = 'ggggg'
				uni.navigateTo({
					url: `../order/addressSetting/addressSetting?longtitude1=${$self.curLoaction.longitude}&latitude1=${$self.curLoaction.latitude}&longtitude2=${longtitude2}&latitude2=${latitude2}&name=${name}$desc=${desc}`
				})
      },
      // 获取当前经纬度
      getCurLocation() {
        amap.getRegeo({
					// location: `${res.longitude},${res.latitude}`,
				})
					.then(address => {
						$self.curLoaction = Object.assign({}, {
							address: address[0].regeocodeData.formatted_address,
							longitude: address[0].longitude,
							latitude: address[0].latitude
						})
						uni.setStorageSync('city', address[0].regeocodeData.addressComponent.city)
						console.log(address)
						// 获取订单列表
						$self.getGrabList()
					})
      },
      // 获取订单列表
      getGrabList() {
        uni.request({
          // url: `https://messagecome.com/order/grabOrderList?longitude=${$self.curLoaction.longitude}&latitude=${$self.curLoaction.latitude}`,
          url: `https://messagecome.com/order/grabOrderList?longitude=113.900114&latitude=22.674341`,
          method: 'POST',
          data: {
            // longitude: $self.curLoaction.longitude,
						// latitude: $self.curLoaction.latitude
						longitude: '113.900034',
						latitude: '22.674162'
          }
        })
          .then(infoRes => {
            let [err, res] = infoRes
            console.log(res)
            if (res.data && res.data.status === 1) {
							$self.formatList(res.data.data)
							$self.grabData = res.data.data
            }
          })
      },
      // 格式化接单列表
      formatList(list) {
				list && list.map(item => {
					let num = item.orderDetailVos.reduce((init, item) => {
						return init + item.classifyCount
					}, 0)
					item.num = num
				})
      },
			// 抢单按钮分发事件
			grab(item) {
				this.grabTipsShow = true
				this.curOrderNo = item.orderNo
				uni.request({
					url: `https://messagecome.com/order/grabOrder?orderNo=${item.orderNo}&uuid=${this.uuid}`,
					method: 'POST'
				})
				.then(infoRes => {
					let [err, res] = infoRes
					console.log(res)
					if (res.data && res.data.status === 1) {
						$self.grabTipsShow = show
					}
				})
			},
			// 订单详情按钮
			goDetail() {
				this.grabTipsShow = false
				this.queryDetail(this.curOrderNo)
			},
			// 继续抢单
			goContinue() {
				this.grabTipsShow = false
			},
			// 查看抢到订单明细
			checkDetail(item) {
				this.queryDetail(item.orderNo)
			},
      // 请求当前订单的详情
			queryDetail(orderNo) {
				uni.request({
					method: 'POST',
					url: `https://messagecome.com/order/orderInfo?orderNo=${orderNo}`
				}).then(infoRes => {
					let [err, res] = infoRes
					if (res.data && res.data.status === 1) {
						this.orderDetailShow = true
						let detail = res.data.data
						let bigClassify = detail.orderDetailVos.find(classify => classify.classifyType === 0)
						let middleClassify = detail.orderDetailVos.find(classify => classify.classifyType === 1)
						let smallClassify = detail.orderDetailVos.find(classify => classify.classifyType === 2)
						
						// 各个袋子的数量
						let bigNum = bigClassify ? bigClassify.classifyCount : 0
						let middelNum = middleClassify ? middleClassify.classifyCount : 0
						let smallNum = smallClassify ? smallClassify.classifyCount : 0
						this.curOrderDetail = Object.assign ({}, {
							time: 300,
							userName: detail.userName,
							mobile: detail.mobile,
							addressName: detail.addressName,
							bigNum: bigNum,
							middleNum: middelNum,
							smallNum: smallNum,
							time: 190,
							remark: detail.remark || '无'
						})
					}
				})
      },
			// 关闭详情
			closeDetail() {
				this.orderDetailShow = false
			}
    }
  }
</script>

<style lang="scss" scoped>
  .grab-order-wrapper {
    margin-top: 95rpx;
    padding: 0 30rpx;
    overflow: auto;
    .location {
      display: flex;
      align-items: center;
      height: 160rpx;
      box-sizing: border-box;
      width: 92%;
      padding: 30rpx;
      position: absolute;
      left: 4%;
      top: 90rpx;
      box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(33,33,33,0.1);
      border-radius: 8rpx;
      background-color: #fff;
      .info {
				height: 100%;
        flex: 1;
        .item {
          display: flex;
          align-items: flex-start;
					height: 100%;
					margin-right: 10rpx;	
          .label {
						width: 60rpx;
            font-size: 28rpx;
            color: #808080;
						margin-right: 10rpx;	
          }
          .text {
						flex: 1;
            font-size: 32rpx;
            color: #4A4A4A;
          }
        }
      }
    }
		.mask {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background:rgba(0,0,0,0.4);
			z-index: 10;
			.middle {
				position: relative;
				width: 72%;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #fff;
				border-radius: 26rpx;
				&.order-info {
					height: 330rpx;
					.suc-pic {
						width: 60rpx;
						height: 60rpx;
						margin: 0 auto 20rpx;
						line-height: 60rpx;
						background-color: #F7B500;
						color: #fff;
						font-size: 32rpx;
						font-weight: consolas;
						text-align: center;
						border-radius: 50%;
					}
					.suc-txt {
						font-size: 36rpx;
						line-height: 44rpx;
						color: #030303;
					}
					.next {
						display: flex;
						justify-content: center;
						margin-top: 36rpx;
						.btn {
							box-sizing: border-box;
							width: 140rpx;
							height: 48rpx;
							line-height: 48rpx;
							font-size: 28rpx;
							text-align: center;
							margin-right: 20rpx;
							border-radius: 10rpx;
						}
						.cancel {
							color: #7F7C7F;
							border: 2rpx solid #DCDCDC;
						}
						.continue {
							background:#1DA06E;
							color: #fff;
							border: 2rpx solid #1DA06E;
						}
					}
				}
				&.grab-suc {
					// height: 398rpx;
					// padding: 0 36rpx;
					box-sizing: border-box;
					.title {
						box-sizing: border-box;
						width: 100%;
						height: 96rpx;
						padding: 0 36rpx;
						display: flex;
						align-items: center;
						border-bottom: 2rpx solid #E0E0E0;
						font-size: 28rpx;
						color: #808080;
						.funnel {
							width: 40rpx;
							height: 43rpx;
						}
						.txt{
							flex: 1;
							display: flex;
							align-items: center;
							.time {
								margin: 0 10rpx;
								font-family: PingFangSC-Semibold;
								font-size: 48rpx;
								color: #227656;
							}
						}
						.time {
							margin: 0 10rpx;
							font-family: PingFangSC-Semibold;
							font-size: 48rpx;
							color: #227656;
						}
						.close {
							width: 30rpx;
							height: 30rpx;
						}
					}
					.detail {
						padding: 20rpx 36rpx;
						.item {
							display: flex;
							align-items: center;
							margin: 5rpx 0;
							.label {
								width: 120rpx;
								font-size: 24rpx;
								color: #808080;
							}
							.txt {
								flex: 1;
								font-size: 28rpx;
								line-height: 36rpx;
								color: #4A4A4A;
							}
						}
						
					}
				}
			}
		}
  }
</style>