<template>
  <view class="page_content">
    <!--swiper @change="swiperChange" previous-margin="50px" next-margin="50px" class="swiper" :indicator-dots="false"
      :autoplay="false" :interval="3000" :duration="1000" :current="bigIdx">
      <swiper-item>
        <view @click="goToLoanList" :class="['swiper-item', 'big']" style="background: linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1)); box-shadow: 0px 3px 12px 0px rgba(195,164,110,0.23)">
          <image class="img" src="/static/my/icon_vip.png"></image>
          <text class="title">借款合同</text>
          <text class="sub_title">点击查看</text>
        </view>
      </swiper-item>
      <swiper-item>
        <view :class="['swiper-item', 'big']" style="background: linear-gradient(94deg,rgba(192,160,105,1),rgba(233,213,172,1)); box-shadow: 0px 3px 12px 0px rgba(195,164,110,0.23)">
          <image class="img" src="/static/my/icon_vip.png"></image>
          <text class="title">{{(userInfo.debitAmount || '0.00') | toThousandFilter}}</text>
          <text class="sub_title">剩余额度</text>
        </view>
      </swiper-item>
      <swiper-item>
        <view @click="goRepaymentList" :class="['swiper-item', 'big']" style="background: linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1)); box-shadow: 0px 3px 12px 0px rgba(195,164,110,0.23)">
          <image class="img" src="/static/my/icon_vip.png"></image>
          <text class="title">还款计划</text>
          <text class="sub_title">点击查看</text>
        </view>
      </swiper-item>
    </swiper-->
    
    <view class="title_line">
      <text class="title">我的借款</text>
    </view>
    
    <view class="uni-flex uni-row slider" style="justify-content: space-around">
      <view class="s_item">
        <view class="content" @click="goToLoanList()">
          <image src="/static/my/icon_friend.png" class="img"></image>
          <text class="name">借款合同</text>
          <text class="btn">查看</text>
        </view>
      </view>
      <view class="s_item">
        <view class="content" @click="goRepaymentList()">
          <image src="/static/my/icon_profile.png" class="img"></image>
          <text class="name">还款计划</text>
          <text class="btn">查看</text>
        </view>
      </view>
    </view>

    <view class="title_line">
      <text class="title">我的任务</text>
    </view>

    <scroll-view class="slider" scroll-x="true">
      <view class="s_item">
        <view class="content" @click="gotoIdCard()">
          <image src="/static/my/icon_friend.png" class="img"></image>
          <text class="name">实名认证</text>
          <text class="desc">实名认证提高额度</text>
          <text class="btn">{{this.userInfo.idCard ? '已填写' : '去完成'}}</text>
        </view>
      </view>
      <view class="s_item">
        <view class="content" @click="gotoBankCard()">
          <image src="/static/my/icon_profile.png" class="img"></image>
          <text class="name">绑定银行卡</text>
          <text class="desc">绑定银行卡提现</text>
          <text class="btn">{{this.userInfo.idCard ? '已填写' : '去完成'}}</text>
        </view>
      </view>
      <view class="s_item">
        <view class="content" @click="gotoSocialInfo()">
          <image src="/static/my/icon_friend.png" class="img"></image>
          <text class="name">填写资料</text>
          <text class="desc">完善信息提高额度</text>
          <text class="btn">{{this.userInfo.idCard ? '已填写' : '去完成'}}</text>
        </view>
      </view>
    </scroll-view>

    <view class="title_line">
      <text class="title">操作</text>
    </view>

    <view class="welfare">
      <!--view class="item" @click="gotoCustomerService()">
        <view class="border">
          <image class="img" src="/static/my/icon-service.png"></image>
        </view>
        <text class="txt">在线客服</text>
      </view-->
      <view class="item" @click="checkVersion()">
        <view class="border">
          <image class="img" src="/static/my/icon-refresh-up.png"></image>
        </view>
        <text class="txt">检查版本</text>
      </view>
      <!--view class="item" @click="resetPassword()">
        <view class="border">
          <image class="img" src="/static/my/icon-safe.png"></image>
        </view>
        <text class="txt">修改密码</text>
      </view-->
      <view class="item" @click="signOut()">
        <view class="border">
          <image class="img" src="/static/my/icon-logout.png"></image>
        </view>
        <text class="txt">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    UserActions
  } from '../../../store/actions.js';

  import ui from '../../../mixins/ui.js';
  import navitator from '../../../mixins/navitator.js';

  export default {
    mixins: [ui, navitator],

    data() {
      return {
        title: 'Hello',
        bigIdx: 1,
      }
    },

    computed: {
      ...mapGetters(['userInfo']),
    },

    methods: {
      swiperChange(e) {
        this.bigIdx = e.detail.current
      },

      goToLoanList() {
        this.goToPage('/pages/form/request/contract', true);
      },

      goRepaymentList() {
        this.goToPage('/pages/form/repayment/list', true);
      },

      gotoIdCard() {
        this.goToPage('/pages/form/idcard/idcard', true);
      },

      gotoBankCard() {
        this.goToPage('/pages/form/bankcard/bankcard', true);
      },

      gotoSocialInfo() {
        this.goToPage('/pages/form/socialinfo/socialinfo', true);
      },

      gotoCustomerService() {
        this.openCustomerServicePage();
      },

      checkVersion() {
        this.toast("当前已是最新版本");
      },

      resetPassword() {
        this.goToPage('/pages/form/password/reset', true);
      },

      async signOut() {
        try {
          const [err, res] = await this.confirm('确定退出登录？', '操作确认');
          if (!res.confirm) return;

          this.showLoading();

          await this.$store.dispatch(UserActions.UserSignOut, {});
          
          this.$jsBridge.call('webSignOut', {});
        } catch (e) {
          this.toast('退出失败：' + e.message);
        }

        this.hideLoading();
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../common/uni-nvue.css';

  @function realSize($args) {
    @return $args / 1.5;
  }

  page {
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .page_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    padding-top: var(--status-bar-height);
    width: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;

    .btn {
      width: 27px;
      height: 27px;
    }

    .title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(43, 43, 43, 1);
      line-height: 41px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .header-container {
    margin-top: 10upx;
    width: 90%;
  }
  
  .header-user-info {
    margin-left: 20upx;
    font-size: 1.2em;
    
    justify-content: center;
  }

  .my-logo {
    width: 150upx;
    height: 150upx;
    margin-top: 10upx;
    border-radius: 50%;
    margin-right: 20 upx;
    box-shadow: 0 0 5px gray;
  }

  .swiper {
    width: 100%;
    margin-top: 10px;

    .swiper-item {
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      margin-right: 10px;
    }

    .big {
      margin-top: 0;

      .img {
        margin-top: 15px;
        width: 30px;
        height: 30px;
      }

      .title {
        font-size: 1.7em;
        color: rgba(255, 255, 255, 1);
        line-height: 41px;
      }

      .sub_title {
        font-size: 0.9em;
        color: rgba(255, 255, 255, 1);
        line-height: 41px;
      }
    }

    .small {
      margin-top: 14px;
      height: 75%;

      // transition: all 0.3s;
      .img {
        margin-top: 5px;
        width: 25px;
        height: 25px;
      }

      .title {
        font-size: 15px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 31px;
      }

      .sub_title {
        font-size: 7px;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  .title_line {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .title {
      margin-left: 20px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 41px;
    }

    .more {
      margin-right: 20px;
      font-size: 10px;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      line-height: 41px;
    }
  }

  .slider {
    white-space: nowrap;
    width: 100%;

    .s_item {
      display: inline-block;
      width: 30%;
      margin-left: 8px;
      margin-right: 5px;
      margin-bottom: 10px;

      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: white;
        margin-top: 5px;
        box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);

        .img {
          width: 93px;
          height: 95px;
        }

        .name {
          margin-top: -10px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }

        .desc {
          font-size: 10px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 21px;
        }

        .btn {
          width: 80px;
          height: 30px;
          margin-bottom: 10px;
          background: linear-gradient(94deg, rgba(192, 160, 105, 1), rgba(233, 213, 172, 1));
          box-shadow: 0px 9px 28px 0px rgba(195, 164, 110, 0.23);
          border-radius: 29px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .welfare {
    width: 92%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 21px 0px rgba(103, 103, 103, 0.2);
    border-radius: 10px;
    margin-bottom: 10px;

    .item {
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .border {
        margin-top: 5px;
        border: 2px solid #c9ac7a;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .img {
          padding: 3px;
          width: 30px;
          height: 30px;
        }
      }

      .txt {
        margin-top: 5px;
        font-size: 10px;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
</style>
