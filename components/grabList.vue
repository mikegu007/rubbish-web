<template name="grab-list">
  <view class="grab-list">
    <view class="grab-item" v-for="item in list" :key="item.id" @tap="checkDetail(item)">
      <image class="avator" :src="item.avator"></image>
      <view class="order-info">
        <view class="location">
          <text class="label">地址:</text>
          <text class="text">{{ item.location }}</text>
        </view>
        <view class="location">
          <text class="label">数量:</text>
          <text class="text">{{ item.num }}袋</text>
        </view>
      </view>
      <view class="status">
        <view v-if="item.type === 0" class="grabing extend-click" @tap="grab(item)">抢单</view>
        <view v-if="item.type === 1" class="success">抢单成功</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'grab-list',
    props: {
      list: {
        type: Array
      }
    },
    methods: {
      // 抢单按钮事件
      grab(item) {
        this.$emit('grab', item)
      },
      checkDetail(item) {
        if (item.type === 1) {
          this.$emit('check-detail', item)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .grab-item {
    box-sizing: border-box;
    // height: 130rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    padding: 30rpx 24rpx;
    background-color: #fff;
    &:last-child {
      margin-bottom: 0;
    }
    .avator {
      width: 70rpx;
      height: 70rpx;
      margin-right: 20rpx;
    }
    .order-info {
      flex: 1;
      .location {
        font-size: 28rpx;
        line-height: 36rpx;
        color: #808080;
        .text {
          margin-left: 10rpx;
          color: #4A4A4A;
        }
      }
    }
    .status {
      font-size: 28rpx;
      .grabing {
        margin-top: 10rpx;
        width: 100rpx; 
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        background-color: #1DA06E;
        border-radius: 10rpx;
        color: #fff;
      }
      .success {
        color: #1DA06E;
      }
    }
  }
</style>