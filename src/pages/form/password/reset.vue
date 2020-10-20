<template>
  <view class="uni-container uni-flex uni-column">
    <view>
      <view style="font-size: 1.5em;">修改您的登录密码</view>
    </view>
    <view class="ui-all">
      <view class="ui-list">
        <text>原始密码</text>
        <input v-model="password.orignalPwd" type="password" placeholder="填写原始密码" placeholder-class="place" />
      </view>
      <view class="ui-list">
        <text>新的密码</text>
        <input v-model="password.newPwd" type="password" placeholder="填写新的密码" placeholder-class="place" />
      </view>
      <view class="ui-list">
        <text>确认密码</text>
        <input v-model="password.confirmPwd" type="password" placeholder="确认新的密码" placeholder-class="place" />
      </view>
    </view>

    <button class="add-btn" type="primary" @click="onConfirm">确定</button>
  </view>
</template>

<script>
  import ui from '../../../mixins/ui.js';
  import {
    UserActions
  } from '../../../store/actions.js'

  export default {
    mixins: [ui],

    data() {
      return {
        password: {
          orignalPwd: '',
          newPwd: '',
          confirmPwd: '',
        }
      }
    },

    methods: {
      async onConfirm() {
        try {
          if (!this.password.orignalPwd) return this.toast('原始密码不能为空');
          if (!this.password.newPwd) return this.toast('新的密码不能为空');
          if (!this.password.confirmPwd) return this.toast('确认密码不能为空');

          const [err, res] = await this.confirm('确定修改密码？', '操作确认');
          if (!res.confirm) return;

          this.showLoading();
          await this.$store.dispatch(UserActions.UpdatePwd, this.password);
          this.toast('修改成功');

          uni.navigateBack({
            delta: 1
          });
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
