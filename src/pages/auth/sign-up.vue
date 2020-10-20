<template>
  <view class="zai-box">
    <image src="../../static/auth/register.png" mode='aspectFit' class="zai-logo"></image>
    <view class="zai-title">注册</view>
    <view class="zai-form">
      <input v-model="mobile" class="zai-input" placeholder="请输入手机号" />
      <input v-model="password" class="zai-input" password placeholder="请输入密码" />
      <input v-model="confirmPassword" class="zai-input" password placeholder="输入确认密码" />
      <button class="zai-btn" @click="onSignUp">立即注册</button>
      <navigator url="../auth/index" open-type='navigateBack' hover-class="none" class="zai-label">已有账号，点此去登录</navigator>
    </view>
  </view>
</template>

<script>
  import ui from '../../mixins/ui.js';
  import navitator from '../../mixins/navitator.js';
  import {
    UserActions
  } from '../../store/actions.js';

  export default {
    mixins: [ui, navitator],

    data() {
      return {
        mobile: '', // undefined,
        password: '', // undefined
        confirmPassword: '', // undefined
      }
    },

    methods: {
      async onSignUp() {
        try {
          if (this.password.length < 6) {
            return this.toast('密码长度不能小于6个字符');
          }

          if (this.password !== this.confirmPassword) {
            return this.toast('两次密码必须一致');
          }

          this.showLoading('注册中');

          await this.$store.dispatch(UserActions.UserSignUp, {
            mobile: this.mobile,
            password: this.password,
          });

          const userInfo = await this.$store.dispatch(UserActions.UserSignIn, {
            mobile: this.mobile,
            password: this.password
          });

          this.hideLoading();
          this.toast('注册成功', 'success');

          // todo: 调用 App 中的登录成功方法
          const stayHere = this.$jsBridge.call('webSignIn', {
            mchId: userInfo.mchId,
            mobile: this.mobile,
            password: this.password
          });

          if (!stayHere) {
            uni.navigateBack({
              delta: 2
            });
          }
        } catch (e) {
          this.toast('登录出错：' + e.message);
        }

        this.hideLoading();
      }
    }
  }
</script>

<style>
  .zai-box {
    padding: 100upx 100upx 0 100upx;
    position: relative;
  }

  .zai-logo {
    width: 100%;
    width: 100%;
    height: 310upx;
  }

  .zai-title {
    position: absolute;
    top: 100upx;
    line-height: 360upx;
    font-size: 68upx;
    color: #fff;
    text-align: center;
    width: 100%;
    margin-left: -100upx;
  }

  .zai-form {
    margin-top: 100upx;
  }

  .zai-input {
    background: #e2f5fc;
    margin-top: 30upx;
    border-radius: 100upx;
    padding: 20upx 40upx;
    font-size: 36upx;
  }

  .input-placeholder,
  .zai-input {
    color: #94afce;
  }

  .zai-label {
    padding: 60upx 0;
    text-align: center;
    font-size: 30upx;
    color: #a7b6d0;
  }

  .zai-btn {
    background: #ff65a3;
    color: #fff;
    border: 0;
    border-radius: 100upx;
    font-size: 36upx;
    margin-top: 60upx;
  }

  .zai-btn:after {
    border: 0;
  }

  /*按钮点击效果*/
  .zai-btn.button-hover {
    transform: translate(1upx, 1upx);
  }
</style>
