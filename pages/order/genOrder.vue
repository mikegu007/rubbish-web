<template name="gen-order">
  <view class="gen-order-wrapper">
    <view class="count-down" v-if="type === 'pending'">
      <view class="count-time">{{ time | timeFilter }}</view>
      <view class="count-txt">等待时间</view>
    </view>
    <view class="order-suc" v-if="type === 'success'">
      <image class="suc-pic" src="../../static/images/success-orange.png"></image>
      <view class="suc-txt">抢单成功</view>
    </view>
    <view class="tip">{{ tips }}</view>
    <view class="next">
      <view class="btn extend-click cancel" v-if="type === 'pending'" @tap="cancelOrder">取消订单</view>
      <view class="btn extend-click cancel" v-if="type === 'success'" @tap="goDetail">查看订单</view>
      <view class="btn extend-click continue" @tap="continueOrder">继续下单</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'gen-order',
    data() {
      return {
        time: 180,
        timer: null,
        type: 'success' // pending 等待中  success 成功抢单
      }
    },
    computed: {
      tips() {
        return this.type === 'pending' ? '您的订单已生成，等待抢单！' : '已抢单，请耐心等待工作人员上门！'
      }
    },
    // filters: {
    //   timeFilter(val) {
    //     let min = parseInt(val / 60)
    //     min = min < 10 ? `0${min}` : min
    //     let second = val % 60
    //     second = second < 10 ? `0${second}` : second
    //     return `${min}:${second}`
    //   }
    // },
    mounted() {
      this.countDown()
    },
    destroyed() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    methods: {
      countDown() {
        this.timer = setInterval(() => {
          if (this.timer < 0) {
            clearInterval(this.timer)
            return
          }              
          --this.time
        }, 1000)
      },
      cancelOrder() {
        let $self = this
        uni.showModal({
          title: '取消订单',
          content: '您正在取消订单，确认继续',
          cancelColor: '#808080',
					confirmColor: '#1DA06E',
          success: function (res) {
            if (res.confirm) {
              $self.$emit('cancel')
              uni.navigateTo({
                url: '../order/cancelOrder/cancelOrder'
              })  
            }
          }
         })
      },
      goDetail() {
        uni.navigateTo({
          url: '../order/detail/detail'
        })  
      },
      continueOrder() {
        this.$emit('continue')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gen-order-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92%;
		height: 378rpx;
		padding: 44rpx 0 54rpx;
		position: absolute;
		left: 4%;
		top: 90rpx;
    background-color: #fff;
    box-shadow: 0 2rpx 6rpx 2rpx rgba(33,33,33,0.1);
    border-radius: 8rpx;
    .count-down {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 154rpx;
      height: 154rpx;
      background: url('../../static/images/count-down.png') no-repeat;
      background-size: 100% 100%; 
      .count-time {
        color: #1DA06E;
        font-family:PingFangSC-Semibold;
        font-size: 40rpx;
        line-height: 56rpx;
      }
      .count-txt {
        color: #808080;
        font-size: 24rpx;
        line-height: 32rpx;
      }
    }
    .order-suc {
      text-align: center;
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
    }
    
    .tip {
      margin: 24rpx 0;
      color: #4D4D4D;
      font-size: 32rpx;
      line-height: 40rpx;
    }
    .next {
      display: flex;
      justify-content: center;
      .btn {
        box-sizing: border-box;
        width: 140rpx;
        height: 48rpx;
        // display: flex;
        // align-content: center;
        // justify-content: center;
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
</style>