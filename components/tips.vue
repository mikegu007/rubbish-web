<template name="tips">
  <view class="tips">
    {{ tips }}
  </view>
</template>

<script>
  export default {
    name: 'tips',
    props: {
      tips: {
        type: String,
        default: '没有找到对应数据'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tips {
    width: 100%;
    margin-top: 100rpx;
    font-size: 32rpx;
    text-align: center;
    color: #808080;
  }
</style>