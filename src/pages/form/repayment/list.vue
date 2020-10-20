<template>
  <view class="uni-container uni-column" style="background-color: transparent;">
    <view v-if="repayments.items.length">
      <view class="uni-flex uni-row bc-form" v-for="(item, idx) in repayments.items" :key="idx">
        <view>
          <image style="padding: 20rpx; width: 120rpx; height: 120rpx; background-color: #FFF;" mode="aspectFit" src="../../../static/bc/icon-hand-money.png"></image>
        </view>
        <view class="uni-flex uni-column">
          <view>{{item.title}}：{{item.repayAt}}</view>
          <view>偿还本金：{{item.principal | toThousandFilter}}</view>
          <view>偿还利息：{{item.interest}}</view>
        </view>
      </view>
    </view>
    <view class="uni-flex uni-column" style="margin-top: 15vh; align-items: center;" v-else>
      <image src="../../../static/common/empty.png" mode="aspectFit"></image>
      <text style="margin: 40upx 0 20upx 0;">暂无还款</text>
    </view>
  </view>
</template>

<script>
  import ui from '../../../mixins/ui.js';
  import navitator from '../../../mixins/navitator.js';
  import {
    mapGetters
  } from 'vuex';
  import {
    MemRepaymentActions
  } from '../../../store/actions.js';

  export default {
    mixins: [ui, navitator],

    data() {
      return {
        repayments: {
          items: []
        }
      }
    },

    computed: {
      ...mapGetters(['userInfo']),
    },

    onLoad() {
      this.getRepaymentList();
    },

    methods: {
      async getRepaymentList() {
        this.showLoading();

        try {
          this.repayments = await this.$store.dispatch(MemRepaymentActions.GetRepaymentList, {})
        } catch (e) {
          console.error(e);
        }

        this.hideLoading();
      }
    }
  }
</script>

<style>
  @import '../../../common/uni-nvue.css';

  .bc-form {
    margin-bottom: 20rpx;
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
