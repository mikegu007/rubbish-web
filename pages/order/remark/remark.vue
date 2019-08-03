<template>
  <view class="remark-wrapper">
    <view class="remark">
      <textarea class="textarea" placeholder="填写额外对工作人员备注的信息"/>
    </view>
    <view class="submit">确定</view>
  </view>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .remark-wrapper {
    padding: 36rpx 30rpx 0;
    .remark {
      box-sizing: border-box;
      height: 378rpx;
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