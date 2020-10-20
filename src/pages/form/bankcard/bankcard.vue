<template>
  <view class="uni-container uni-column" style="background-color: transparent;">
    <view class="uni-flex unirow bc-form" v-if="userInfo.bankCard">
      <view>
        <image style="padding: 20rpx; width: 100rpx; height: 100rpx; background-color: #FFF;" mode="aspectFit" src="../../../static/bc/icon-hand-money.png"></image>
      </view>
      <view class="uni-flex uni-column" @click="onShowBankCard">
        <view>{{userInfo.bankCard.accountName}}</view>
        <view>{{userInfo.bankCard.accountBank}}</view>
        <view>{{userInfo.bankCard.accountNo}}</view>
      </view>
    </view>
    <view class="uni-flex uni-column" style="margin-top: 15vh; align-items: center;" v-else>
      <image src="../../../static/common/empty.png" mode="aspectFit"></image>
      <text style="margin: 40upx 0 20upx 0;">暂无银行卡</text>
    </view>

    <button class="add-btn" type="primary" @click="onAddNewCard" v-if="!userInfo.bankCard">添加银行卡</button>
  </view>
</template>

<script>
  import navitator from '../../../mixins/navitator.js';
  import uniFab from '@/components/uni-fab/uni-fab.vue';
  import {
    mapGetters
  } from 'vuex';

  export default {
    components: {
      uniFab
    },

    mixins: [navitator],

    data() {
      return {
      }
    },
    
    computed: {
      ...mapGetters(['userInfo']),
    },

    methods: {
      onShowBankCard() {
        this.goToPage('/pages/form/bankcard/newBankCard', true, this.userInfo.bankCard);
      },
      
      onAddNewCard() {
        this.goToPage('/pages/form/bankcard/newBankCard', true);
      }
    }
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
