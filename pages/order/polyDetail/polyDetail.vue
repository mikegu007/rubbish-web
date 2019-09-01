<template>
  <view class="steps-box">
    <view class="step-item" v-for="(step, index) in steps" :key="index">
      {{step.instruction}}
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        steps: []
      }
    },
    onReady() {
      let steps = uni.getStorageSync("steps");
      this.steps = steps
    },
  }
</script>

<style lang="scss" scoped>
  .steps-box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 30rpx;
    overflow: auto;
    background-color: #fff;
    .step-item {
      width: 100%;
      line-height: 60rpx;
      border-bottom: 2rpx solid #E0E0E0;
    }
  }
</style>