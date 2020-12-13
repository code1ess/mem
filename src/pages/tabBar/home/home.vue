<template>
  <view class="uni-container">
    <view class="uni-flex uni-column">
      <view class="uni-flex uni-column home-ad">
        <view class="home-ad-row-1"> 一万日息仅2元 </view>
        <view class="home-ad-row-2"> 申请到放款，最快5分钟 </view>
        <view class="home-ad-row-3">
          <text>最高可申请<text style="font-size: 1.8em">30</text>万</text>
        </view>
        <view class="home-ad-row-4">
          额度高利率低 | 信息安全保障 | 权威机构合作
        </view>
      </view>
      <view class="uni-flex uni-column home-tasks">
        <view class="uni-flex uni-row home-tasks-row-1">
          完成以下操作获得额度
        </view>
        <view class="uni-flex uni-row home-tasks-row-2">
          <view
            class="uni-flex uni-column home-tasks-row-2-item"
            @click="onGotoPage('/pages/form/idcard/idcard')"
          >
            <image
              style="width: 60upx; height: 60upx"
              src="../../../static/home/initial-id.png"
            ></image>
            <view>实名认证</view>
          </view>
          <view class="uni-flex uni-column home-tasks-row-2-item">
            <image
              style="width: 60upx; height: 60upx"
              src="../../../static/home/initial-safety.png"
            ></image>
            <view>安全评估</view>
          </view>
          <view
            class="uni-flex uni-column home-tasks-row-2-item"
            @click="onGotoPage('/pages/form/bankcard/bankcard')"
          >
            <image
              style="width: 60upx; height: 60upx"
              src="../../../static/home/initial-card.png"
            ></image>
            <view>绑定银行卡</view>
          </view>
          <view
            class="uni-flex uni-column home-tasks-row-2-item"
            @click="onGotoPage('/pages/form/socialinfo/socialinfo')"
          >
            <image
              style="width: 60upx; height: 60upx"
              src="../../../static/home/initial-face.png"
            ></image>
            <view>个人资料</view>
          </view>
        </view>
      </view>

      <view class="uni-flex uni-row">
        <button
          class="uni-color-warning home-btn-check"
          @click="onRequest"
          v-if="this.userInfo.loan"
        >
          查看贷款申请
        </button>
        <button
          class="uni-color-warning home-btn-request"
          @click="onRequest"
          v-else
        >
          立即申请
        </button>
      </view>

      <view class="uni-flex uni-column home-actions">
        <view class="uni-flex uni-row home-actions-row">
          <view
            class="uni-flex uni-column home-tasks-row-2-item"
            @click="onGotoPage('/pages/tabBar/wallet/wallet', false)"
          >
            <image
              style="width: 60upx; height: 60upx"
              src="../../../static/home/initial-id.png"
            ></image>
            <view>我的钱包</view>
          </view>
          <view
            class="uni-flex uni-column home-tasks-row-2-item"
            @click="onGotoPage('/pages/tabBar/my/my', false)"
          >
            <image
              style="width: 60upx; height: 60upx"
              src="../../../static/home/initial-safety.png"
            ></image>
            <view>我的信息</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import ui from "../../../mixins/ui.js";
import navitator from "../../../mixins/navitator.js";
import { mapGetters } from "vuex";
import { UserActions } from "../../../store/actions.js";

// #ifdef APP-PLUS
var domModule = weex.requireModule("dom");
domModule.addRule("fontFace", {
  fontFamily: "uniicons",
  src: "url('/static/uni.ttf')",
});
// #endif

export default {
  mixins: [ui, navitator],

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["userInfo"]),
  },

  async onLoad() {
    try {
      // 判断是否需要清理用户信息，若是从 App 退出的情况，Web页面会有存留，需要清理
      const clear = this.$jsBridge.call("clearUserInfo", {});
      if (clear) {
        await this.$store.dispatch(UserActions.UserSignOut, {});
      }
    } catch (e) {
      this.toast("清理用户信息失败：" + e.message);
    }
  },

  onShow() {
    try {
      this.$store.dispatch(UserActions.GetUserInfo, {});

      // 没有登录，调用JS桥退出
      if (!this.userInfo.id) {
        this.$jsBridge.call("webSignOut", {});
      }
    } catch (e) {
      console.error(e.message);
    }
  },

  methods: {
    onGotoPage(url, checkPermission = true) {
      this.goToPage(url, checkPermission);
    },

    async onRequest() {
      this.checkForm(true);
    },
  },
};
</script>

<style>
@import "../../../common/uni-nvue.css";

.home-ad {
  border-radius: 20upx;
  padding: 20upx;
  background-image: url("../../../static/home/home-bg.jpg");
  background-size: cover;
}

.home-ad-row-1 {
  color: #eee;
  font-size: 1.1em;
  text-align: right;
}

.home-ad-row-2 {
  color: #efefef;
  font-size: 1em;
  padding: 3upx 0;
}

.home-ad-row-3 {
  color: #fff;
  font-size: 2em;
  font-weight: bolder;
  padding: 3upx 0;
}

.home-ad-row-4 {
  color: #efefef;
  font-size: 1em;
  padding: 10upx 0 0 0;
  text-align: right;
}

.home-tasks {
  padding: 20upx;
  border-radius: 10upx;
  background-color: white;
}

.home-tasks-row-1 {
  padding: 0 10upx 0 10upx;
  font-weight: normal;
  font-size: 1.2em;
}

.home-tasks-row-2 {
  padding: 50upx 0 30upx 0;
  color: #aaa;
  font-size: 0.8em;
  justify-content: space-between;
}

.home-tasks-row-2-item {
  align-items: center;
}

.home-btn-check {
  width: 100%;
  margin-top: 40upx;
  border-radius: 50upx;
}

.home-btn-check::after {
  background-color: #c79448;
  content: "查看贷款申请";
  font-size: 2em;
  color: white;
}

.home-btn-request {
  width: 100%;
  margin-top: 40upx;
  border-radius: 50upx;
}

.home-btn-request::after {
  background-color: #c79448;
  content: "立即申请";
  font-size: 2em;
  color: white;
}

.home-actions {
  padding: 20upx;
  border-radius: 10upx;
  margin-top: 10upx;
}

.home-actions-row {
  padding: 50upx 0 30upx 0;
  color: #aaa;
  font-size: 0.8em;
  justify-content: space-around;
}
</style>
