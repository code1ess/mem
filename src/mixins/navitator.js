/**
 * 导航+权限。
 */
import {
  mapGetters
} from 'vuex';
import {
  ParamActions,
  UserActions,
  UserMutations,
} from '../store/actions.js';

const navitator = {
  computed: {
    ...mapGetters(['userInfo', 'isSignIn']),
  },

  data() {
    return {
      _customerServiceUrl: undefined
    }
  },

  async onNavigationBarButtonTap(e) {
    this.openCustomerServicePage();
  },

  methods: {
    async goToPage(page, checkPermission, options = null) {
      try {
        var query = "";
        for (var key in options) {
          if (query != "") {
            query += "&";
          }
          query += key + "=" + encodeURIComponent(options[key]);
        }

        if (checkPermission) {
          if (this.isSignIn) {
            uni.navigateTo({
              url: page + '?' + query
            });

            return true;
          } else {
            uni.navigateTo({
              url: '/pages/auth/sign-in'
            });

            return false;
          }
        } else {
          uni.navigateTo({
            url: page + '?' + query
          });

          return true;
        }
      } catch (e) {
        this.toast('跳转出错：' + e.message);
      }

      return false;
    },

    // APP 中的聊天界面
    async openCustomerServicePage() {
      try {
        // 打开H5版本的第三方客服
        /*if (!this._customerServiceUrl) {
          const res = await this.$store.dispatch(ParamActions.GetParam, {
            name: 'customer-service-url'
          });
          this._customerServiceUrl = res.value;
        }

        uni.navigateTo({
          url: '/pages/webview/webview?url=' + this._customerServiceUrl
        });*/

        if (this.isSignIn) {
          this.$jsBridge.call('showChat', {});
        } else {
          uni.navigateTo({
            url: '/pages/auth/sign-in'
          });

          return false;
        }
      } catch (e) {
        this.toast('跳转失败：' + e.message);
      }
    },

    async checkForm(confirm = true) {
      if (!this.userInfo.idCard) {
        if (confirm) {
          const [err, res] = await this.confirm('您尚未完成实名，请先实名再申请', '完善实名', '去实名');
          if (!res.confirm) return;
        } 
        
        this.goToPage('/pages/form/idcard/idcard', true);
      } else if (!this.userInfo.bankCard) {
        if (confirm) {
          const [err, res] = await this.confirm('您尚未绑定提现银行卡，请先绑定银行卡', '绑定银行卡', '去绑定');
          if (!res.confirm) return;
        } 
        
        this.goToPage('/pages/form/bankcard/bankcard', true);
      } else if (!this.userInfo.socialInfo) {
        if (confirm) {
          const [err, res] = await this.confirm('您尚未填写个人资料，请先填写个人资料', '完善个人资料', '去填写');
          if (!res.confirm) return;
        }
        
        this.goToPage('/pages/form/socialinfo/socialinfo?checkForm=1', true);
      } else {
        if (this.userInfo.loan) {
          // 已经申请贷款，打开『我的钱包』
          this.goToPage('/pages/tabBar/wallet/wallet', true);
        } else {
          // 否则跳转至申请页面
          this.goToPage('/pages/form/request/request', true);
        }
      }
    }
  }
};

export default navitator;
