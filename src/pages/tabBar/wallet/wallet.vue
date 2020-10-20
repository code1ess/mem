<template>
  <view class="uni-container">
    <view class="uni-flex uni-column">
      <view class="uni-flex uni-row wallet-banner">
        <view>
          <view class="wallet-banner-row-1">
            余额
          </view>
          <view class="wallet-banner-row-2">
            {{(this.userInfo.debitAmount || '0.00') | toThousandFilter}}
          </view>
        </view>
        <view>
          <view class="wallet-banner-row-1">
            提现中
          </view>
          <view class="wallet-banner-row-2">
            {{(userInfo.withdraw ? userInfo.withdraw.amount : '0.00') | toThousandFilter}}
          </view>
        </view>
      </view>
      <view class="uni-flex uni-column wallet-withdraw" v-if="userInfo.bankCard">
        <view class="uni-flex uni-row">
          <uni-tag text="提现银行卡" type="success" size="small"></uni-tag>
        </view>
        <view class="uni-flex uni-row wallet-withdraw-bank-card">
          <text>{{userInfo.bankCard.accountBank}}({{userInfo.bankCard.accountNo.substr(-4)}})</text>
          <text>{{userInfo.bankCard.accountName}}</text>
        </view>
      </view>
      <view class="uni-flex uni-column wallet-tag-container" v-if="userInfo.loan">
        <view v-if="userInfo.tag">
          <view class="uni-flex uni-row wallet-tag">
            <uni-tag :text="userInfo.tag.title" type="warning"></uni-tag>
            <uni-tag text="联系客服" type="error" @click="onGoToCustomerServicePage"></uni-tag>
          </view>
          <view class="uni-flex uni-row wallet-tag-descrption">
            详情说明:
          </view>
          <view class="uni-flex uni-row wallet-tag-descrption">
            {{userInfo.tag.message}}
          </view>
        </view>
        <view v-else>
          <view class="uni-flex uni-row wallet-tag">
            <uni-tag text="申请中" type="warning"></uni-tag>
            <uni-tag text="联系客服" type="error" @click="onGoToCustomerServicePage"></uni-tag>
          </view>
          <view class="uni-flex uni-row wallet-tag-descrption">
            详情说明:
          </view>
          <view class="uni-flex uni-row wallet-tag-descrption">
            您的借款申请已提交，请等待审核。
          </view>
        </view>
      </view>
      <view class="uni-flex uni-row">
        <button class="uni-color-warning wallet-btn-withdraw" type="primary" @click="onWithdraw" :disabled="![3,5].includes(this.userInfo.tagId)" v-if="this.userInfo.id">提现</button>
      </view>
    </view>
  </view>
</template>
<script>
  import ui from '../../../mixins/ui.js';
  import navitator from '../../../mixins/navitator.js';
  import {
    mapGetters
  } from 'vuex';

  export default {
    mixins: [ui, navitator],

    data() {
      return {};
    },

    computed: {
      ...mapGetters(['userInfo']),
    },

    methods: {
      async onGoToCustomerServicePage() {
        this.openCustomerServicePage();
      },
      
      async onWithdraw() {
        if (this.userInfo.loan) {
          if ([3, 5].includes(this.userInfo.tagId)) {
            this.goToPage('/pages/form/withdraw/withdraw');
          } else {
            this.toast("贷款申请需要审核通过才能提现");
          }
        } else {
          this.checkForm(true);
        }
      }
    }
  };
</script>

<style>
  @import '../../../common/uni-nvue.css';

  .wallet-banner {
    padding: 60upx;
    border-radius: 40upx;

    color: white;
    box-shadow: #c79448 0 0 5upx;

    justify-content: space-between;

    background-image: url('../../../static/home/home-bg.jpg');
  }

  .wallet-banner-row-1 {
    font-size: 1em;
  }

  .wallet-banner-row-2 {
    font-size: 2em;
    font-weight: bolder;
  }

  .wallet-banner-row-3 {
    font-size: 1em;
  }

  .wallet-banner-row-4 {
    font-size: 2em;
    font-weight: bolder;
  }

  .wallet-withdraw {
    margin-top: 20upx;
    padding: 30upx;
    box-shadow: lightgray 0 0 5upx;
  }

  .wallet-withdraw-bank-card {
    font-size: 1.5em;
    padding: 20upx 0 0 0;
    justify-content: space-between;
  }

  .wallet-tag {
    justify-content: space-between;
    padding: 20upx 0 0 0;
    font-size: large;
  }

  .wallet-tag-descrption {
    padding: 20upx 0 0 0;
  }

  .wallet-tag-container {
    margin-top: 20upx;
    padding: 30upx;
    box-shadow: lightgray 0 0 5upx;
  }

  .wallet-btn-withdraw {
    margin-top: 60upx;
    border-radius: 50upx;
    width: 100%;
    background-color: #c79448;
  }

  .wallet-btn-withdraw::after {
    background-color: #c79448;
    content: '提现';
    font-size: 2em;
    color: white;
  }
</style>
