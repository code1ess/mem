<template>
  <view class="uni-container uni-column" style="background-color: transparent;">
    <view class="uni-flex uni-column" style="margin-top: 15vh; align-items: center;" v-if="!userInfo.loan">
      <image src="../../../static/common/empty.png" mode="aspectFit"></image>
      <text style="margin: 40upx 0 20upx 0;">暂无借款</text>
    </view>
    <view v-else>
      <view v-html="contract"></view>
    </view>
  </view>
</template>

<script>
  import navitator from '../../../mixins/navitator.js';
  import {
    mapGetters
  } from 'vuex';
  import {
    ContractActions
  } from '../../../store/actions.js';

  export default {
    components: {
    },

    mixins: [navitator],
    
    async onLoad() {
      try {
        const res = await this.$store.dispatch(ContractActions.GetContract, {});
        this.contract = res.content;
      } catch (e) {
        console.error(e.message);
      }
    },

    data() {
      return {
        contract: undefined
      }
    },

    computed: {
      ...mapGetters(['userInfo']),
    },

    methods: {}
  }
</script>

<style>
  @import '../../../common/uni-nvue.css';

  .bc-form {
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 20rpx;
    background-color: white;
    background-size: fit;
    background-image: url(../../../static/bc/ic_gray_bank_other.png);

    box-shadow: gray 0 0 10rpx;
  }

  .add-btn {
    width: 100%;
    margin-top: 1em;
    border-radius: 50upx;
  }

  .add-btn::after {
    background-color: #c79448;
    content: '添加银行卡';
    font-size: 2em;
    color: white;
  }
</style>
