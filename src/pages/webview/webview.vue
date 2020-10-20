<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';

  export default {
    data() {
      return {
        url: 'https://www.baidu.com'
      }
    },
    
    onLoad(options) {
      this.url = options.url;
    },
  }
</script>

<style>
</style>
