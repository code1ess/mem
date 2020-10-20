<template>
  <view class="uni-container withdraw-form" style="background-color: transparent;">
    <view class="uni-flex uni-column">
      <view class="uni-flex uni-column">
        <view class="uni-flex uni-row" style="border-bottom: darkgray 1rpx solid;">
          <label style="font-size: 2em;">¥</label>
          <input v-model="form.amount" class="uni-input withdraw-input" maxlength="6" placeholder="填写提现金额" />
        </view>
        <text style="color: gray; padding: 1em 0;">最高可借 {{userInfo.debitAmount | toThousandFilter}} 元</text>
        <view class="uni-flex uni-column withdraw-form-licence">
          <button class="uni-color-warning withdraw-btn" @click="onConfirm" :disabled="form.amount <= 0">立即提现</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    UserActions,
    MemWithdrawActions
  } from '../../../store/actions.js';

  import ui from '../../../mixins/ui.js';
  import navitator from '../../../mixins/navitator.js';

  export default {
    mixins: [ui, navitator],

    data() {
      return {
        form: {
          amount: undefined,
        },

        durationPickerVisible: false,
        durations: [{
          label: '6个月',
          value: '6个月',
        }, {
          label: '9个月',
          value: '9个月',
        }, {
          label: '12个月',
          value: '12个月',
        }, {
          label: '24个月',
          value: '24个月',
        }, {
          label: '36个月',
          value: '36个月',
        }],

        purposePickerVisible: false,
        purposes: [{
            label: '个人日常消费',
            value: '个人日常消费',
          }, {
            label: '装修房屋',
            value: '装修房屋',
          },
          {
            label: '教育',
            value: '教育',
          },
          {
            label: '医疗',
            value: '医疗',
          },
          {
            label: '旅游',
            value: '旅游',
          }
        ],
      }
    },

    computed: {
      ...mapGetters(['userInfo']),
    },
    
    onLoad() {
      this.form.amount = this.userInfo.debitAmount;
    },

    methods: {
      async onConfirm() {
        if (this.form.amount <= 0) {
          return this.toast('提现金额不能小于 0');
        }
        if (this.form.amount > this.userInfo.debitAmount) {
          return this.toast('提现金额不能超过 ' + this.userInfo.debitAmount);
        }
        
        const [err, res] = await this.confirm("确定提现？", "操作确认");
        if (!res.confirm) return;

        const loading = this.showLoading();
        try {
          await this.$store.dispatch(MemWithdrawActions.CreateMemWithdraw, {
            ...this.form,
            ...this.userInfo.bankCard,
          });

          this.toast("提现成功");
          uni.navigateBack({
            delta: 1
          });
        } catch (e) {
          console.error(e);
        }

        this.hideLoading();
        
        this.$store.dispatch(UserActions.GetUserInfo, {});
      },
    }
  }
</script>

<style>
  @import '../../../common/uni-nvue.css';

  .withdraw-form {}

  .withdraw-input {
    background-color: transparent;
    font-size: 2em;
  }

  .withdraw-form-licence {
    margin-top: 200rpx;
    text-align: center;
    font-size: 0.9em;
    color: gray;
  }

  .withdraw-btn {
    width: 100%;
    margin-top: 1em;
    border-radius: 50upx;
  }

  .withdraw-btn::after {
    background-color: #c79448;
    content: '立即提现';
    font-size: 2em;
    color: white;
  }
</style>
