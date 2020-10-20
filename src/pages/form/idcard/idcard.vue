<template>
  <view class="uni-container uni-flex uni-column">
    <view>
      <view style="font-size: 0.8em; text-align: center;" v-if="!userInfo.idCard">为向您提供后续贷款服务，我们需要您的身份信息</view>
    </view>
    <view class="ui-all">
      <view class="ui-list">
        <text>姓　　名</text>
        <input v-model="idCard.name" type="text" placeholder="填写姓名" placeholder-class="place" :readonly="!!userInfo.idCard" />
      </view>
      <view class="ui-list">
        <text>身份证号</text>
        <input v-model="idCard.cardNo" type="text" placeholder="填写身份证号" placeholder-class="place" :readonly="!!userInfo.idCard" />
      </view>
    </view>

    <view class="uni-flex uni-column">
      <!-- 图文卡片模式 -->
      <uni-card mode="style" :is-shadow="true" :thumbnail="idCard.p1Url || '../../../static/common/user_base_1.jpg'"
        :extra="idCard.p1Url ? '身份证正面' : '选择身份证正面'" @click="onChooseSide1">
      </uni-card>
      <uni-card mode="style" :is-shadow="true" :thumbnail="idCard.p2Url || '../../../static/common/user_base_2.jpg'"
        :extra="idCard.p2Url ? '身份证反面' : '选择身份证反面'" @click="onChooseSide2">
      </uni-card>
    </view>

    <button class="add-btn" type="primary" @click="onSave" v-if="!userInfo.idCard">确定</button>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    UserActions
  } from '../../../store/actions.js';
  import {
    pathToBase64,
    base64ToPath
  } from '../../../js_sdk/image-tools/index.js'
  import ui from '../../../mixins/ui.js';
  import navitator from '../../../mixins/navitator.js';

  export default {
    mixins: [ui, navitator],

    data() {
      return {
        idCard: {
          name: '',
          cardNo: '',
          p1Url: '',
          p2Url: '',
        }
      }
    },

    computed: {
      ...mapGetters(['userInfo']),
    },

    onLoad() {
      if (this.userInfo.idCard) {
        this.idCard = this.userInfo.idCard;
      }
    },

    methods: {
      onChooseSide1() {
        if (this.userInfo.idCard) return;
        
        const self = this;
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          success: function(res) {
            pathToBase64(res.tempFilePaths[0]).then(base64 => {
              self.idCard.p1Url = base64.replace(/[\r\n]/g, '');
            }).catch(error => {
              console.error(error)
            });
          }
        });
      },

      onChooseSide2() {
        if (this.userInfo.idCard) return;
        
        const self = this;
        uni.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          success: function(res) {
            pathToBase64(res.tempFilePaths[0]).then(base64 => {
              self.idCard.p2Url = base64.replace(/[\r\n]/g, '');
            }).catch(error => {
              console.error(error)
            });
          }
        });
      },

      async onSave() {
        try {
          if (!this.idCard.name) return this.toast('姓名不能为空');
          if (!this.idCard.cardNo) return this.toast('身份证号不能为空');
          if (!this.idCard.p1Url) return this.toast('实名需要提供身份证正面照片');
          if (!this.idCard.p2Url) return this.toast('实名需要提供身份证反面照片');

          const [err, res] = await this.confirm('提交不可更改，确定提交？', '提交确认');
          if (!res.confirm) return;

          this.showLoading();
          
          await this.$store.dispatch(UserActions.UpdateIdCard, this.idCard);
          this.$store.dispatch(UserActions.GetUserInfo, {});
          
          this.toast('保存成功');

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

  .id-card-img {
    border-radius: 15upx;
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
