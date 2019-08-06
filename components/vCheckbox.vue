<template name="v-checkbox">
  <image class="chk-img extend-click" :src="src" @tap="checkImage"></image>
</template>

<script>
  export default {
    name: 'v-checkbox',
    data() {
      return {
        active: false
      }
    },
    computed: {
      src() {
        if (!this.active) {
          return '/static/images/checkbox.png'
        }
        return '/static/images/checkbox-active.png'
      }
    },
    methods: {
      checkImage() {
        this.active = !this.active
        this.$emit('check', this.active)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chk-img {
    width: 30rpx;
    height: 30rpx;
  }
</style>