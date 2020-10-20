<template>
  <view class="uni-container uni-flex uni-column">
    <view>
      <view style="font-size: 1.5em;">银行卡信息</view>
      <view style="font-size: 0.8em; color: gray;">银行卡仅用于放贷、还款使用</view>
    </view>
    <view class="ui-all">
      <view class="ui-list">
        <text>姓　名</text>
        <input v-model="bankCard.accountName" type="text" placeholder="填写姓名" placeholder-class="place" :disabled="!!bankCard.id"/>
      </view>
      <view class="ui-list">
        <text>开户行</text>
        <input v-model="bankCard.accountBank" type="text" placeholder="填写开户行" placeholder-class="place" :disabled="!!bankCard.id"/>
      </view>
      <view class="ui-list">
        <text>卡　号</text>
        <input v-model="bankCard.accountNo" type="text" placeholder="填写卡号" placeholder-class="place" :disabled="!!bankCard.id"/>
      </view>
    </view>

    <button class="add-btn" type="primary" @click="onConfirm" v-if="!bankCard.id">确定</button>
  </view>
</template>

<script>
  import ui from '../../../mixins/ui.js';
  import navitator from '../../../mixins/navitator.js';
  
  import {
    UserActions
  } from '../../../store/actions.js'

  export default {
    mixins: [ui, navitator],

    data() {
      return {
        bankCard: {
          accountName: '',
          accountBank: '',
          accountNo: '',
        }
      }
    },
    
    onLoad(options) {
      this.bankCard = options;
      if (this.bankCard.id) {
        uni.setNavigationBarTitle({
        　　title: '我的银行卡'
        })
      }
    },

    methods: {
      async onConfirm() {
        try {
          if (!this.bankCard.accountName) return this.toast('姓名不能为空');
          if (!this.bankCard.accountBank) return this.toast('开户行不能为空');
          if (!this.bankCard.accountNo) return this.toast('卡号不能为空');

          const [err, res] = await this.confirm('提交不可更改，确定提交？', '提交确认');
          if (!res.confirm) return;

          this.showLoading();
          
          await this.$store.dispatch(UserActions.UpdateBankCard, this.bankCard);
          this.$store.dispatch(UserActions.GetUserInfo, {});
          
          this.toast('添加成功');

          this.checkForm(false);
        } catch (e) {
          console.error(e);
        }

        this.hideLoading();
      }
    }
  }
</script>

<style lang="less">
  @import '../../../common/uni-nvue.css';

  .container {
    display: block;
  }

  .ui-all {
    padding: 20rpx 40rpx;

    .avatar {
      width: 100%;
      text-align: left;
      padding: 20rpx 0;
      border-bottom: solid 1px #f2f2f2;
      position: relative;

      .imgAvatar {
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;

        .iavatar {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      text {
        display: inline-block;
        vertical-align: middle;
        color: #8e8e93;
        font-size: 28rpx;
        margin-left: 40rpx;
      }

      &:after {
        content: ' ';
        width: 20rpx;
        height: 20rpx;
        border-top: solid 1px #030303;
        border-right: solid 1px #030303;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        /* IE 9 */
        -moz-transform: rotate(45deg);
        /* Firefox */
        -webkit-transform: rotate(45deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(45deg);
        position: absolute;
        top: 85rpx;
        right: 0;
      }
    }

    .ui-list {
      width: 100%;
      text-align: left;
      padding: 20rpx 0;
      border-bottom: solid 1px #f2f2f2;
      position: relative;

      text {
        color: #4a4a4a;
        font-size: 28rpx;
        display: inline-block;
        vertical-align: middle;
        min-width: 150rpx;
      }

      input {
        color: #030303;
        font-size: 30rpx;
        display: inline-block;
        vertical-align: middle;
      }

      button {
        color: #030303;
        font-size: 30rpx;
        display: inline-block;
        vertical-align: middle;
        background: none;
        margin: 0;
        padding: 0;

        &::after {
          display: none;
        }
      }

      picker {
        width: 90%;
        color: #030303;
        font-size: 30rpx;
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        top: 30rpx;
        left: 150rpx;
      }

      textarea {
        color: #030303;
        font-size: 30rpx;
        vertical-align: middle;
        height: 150rpx;
        width: 100%;
        margin-top: 50rpx;
      }

      .place {
        color: #999999;
        font-size: 28rpx;
      }
    }

    .right:after {
      content: ' ';
      width: 20rpx;
      height: 20rpx;
      border-top: solid 1px #030303;
      border-right: solid 1px #030303;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      /* IE 9 */
      -moz-transform: rotate(45deg);
      /* Firefox */
      -webkit-transform: rotate(45deg);
      /* Safari 和 Chrome */
      -o-transform: rotate(45deg);
      position: absolute;
      top: 40rpx;
      right: 0;
    }

    .save {
      background: #030303;
      border: none;
      color: #ffffff;
      margin-top: 40rpx;
      font-size: 28rpx;
    }
  }

  .add-btn {
    width: 100%;
    margin-top: 1em;
    border-radius: 50upx;
  }

  .add-btn::after {
    background-color: #c79448;
    content: '确定';
    font-size: 2em;
    color: white;
  }
</style>
