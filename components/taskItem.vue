<template name="task-item">
  <view class="task-item">
    <view class="left">
      <text class="title">{{ item.title }}</text>
      <progress backgroundColor="#F3F3F3" :percent="percent" border-radius="3" :activeColor="activeColor" active />
      <view class="description">
        <text class="text">进度</text>
        <text class="progress">{{ item.completed }}/{{ item.total }}</text>
      </view>
    </view>
    <view class="right" :class="{'stop': item.type === 1}">{{ item.type === 1 ? '去阻止' : '去收能' }}</view>
  </view>
</template>

<script>
  export default {
    name: 'task-item',
    computed: {
      activeColor() {
        return this.item.type === 1 ? '#F7B500' : '#3A9B6C'
      },
			percent() {
				return this.item.completed / this.item.total * 100
			}
    },
    props: {
      item: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
  .task-item {
    display: flex;
		align-items: center;
    height: 140rpx;
    margin-bottom: 20rpx;
    padding: 0 36rpx;
    background-color: #fff;
    .left {
      flex: 1;
      .title {
        font-size: 28rpx;
        line-height: 36rpx;
        margin-bottom: 10rpx;
      }
      .description {
        display: flex;
        font-size: 20rpx;
        line-height: 28rpx;
        color: #808080;
        .text {
          flex: 1;
        }
      }
    }
    .right {
      width: 114rpx;
      height: 50rpx;
      margin-left: 40px;
      line-height: 50rpx;
      text-align: center;
      background-color: #1DA06E;
      border-radius: 25rpx;
      color: #fff;
      &.stop {
        background-color: #F7B500;
      }
    }
  }
</style>