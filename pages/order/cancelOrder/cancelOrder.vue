<template>
  <view class="cancel-order-wrapper">
    <view class="title">您取消订单的理由是</view>
    <view class="reason-box">
      <view class="reason-item" v-for="(item, $index) in reasons" :class="{'active': $index === checkedIndex}" :key="item.id" @tap="checkReason(item, $index)">{{ item.label }}</view>
    </view>
    <view class="remark">
      <textarea class="textarea" placeholder="填写额外对工作人员备注的信息"/>
    </view>
    <view class="submit">提交</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        reasons: [
          {label: '想要自己解决垃圾分类问题', id: 0},
          {label: '工作人员许久没有上门收取垃圾', id: 1},
          {label: '工作人员态度较差', id: 2},
          {label: '本次下单操作纯属失误', id: 3}
        ],
        checkedIndex: null,
        checkedReason: ''
      }
    },
    methods: {
     checkReason(item, index) {
       this.checkedReason = item
       this.checkedIndex = index
     } 
    }
  }
</script>

<style lang="scss" scoped>
  .cancel-order-wrapper {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
    padding: 36rpx 30rpx 0;
    overflow: auto;
    .title {
      font-size: 32rpx;
      line-height: 60rpx;
    }
    .reason-box {
      .reason-item {
        height: 90rpx;
        line-height: 90rpx;
        margin-bottom: 20rpx;
        padding-left: 36rpx;
        font-size: 32rpx;
        color: #4A4A4A;
        background-color: #fff;
        border-radius: 4rpx;
        &.active {
          color: #1DA06E;
          background:rgba(29,160,110,0.02);
          border: 2rpx solid rgba(29,160,110,0.14);
        }
      }
    }
    .remark {
      box-sizing: border-box;
      height: 200rpx;
      padding: 36rpx;
      background-color: #fff;
      border-radius: 8rpx;
      margin-bottom: 54rpx;
      .textarea {
        color: #989898;
        font-size: 28rpx;
        line-height: 36rpx
      }
    }
  }
</style>