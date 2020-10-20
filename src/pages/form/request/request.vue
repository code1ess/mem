<template>
  <view class="uni-container request-form" style="background-color: transparent;">
    <view class="uni-flex uni-column">
      <view class="uni-flex uni-column">
        <view class="uni-flex uni-row" style="border-bottom: darkgray 1rpx solid;">
          <label style="font-size: 2em;">¥</label>
          <input v-model="form.amount" class="uni-input request-input" maxlength="6" placeholder="借多少" />
        </view>
        <text style="color: gray; padding: 1em 0;">{{form.minAmount}} 元起借，单笔最高 30,0000 元</text>

        <view class="uni-flex uni-column request-tips" v-if="!form.amount">
          <text>
            温馨提示
          </text>
          <text>
            借款并按期还款即有机会提高额度，降低利率。
          </text>
        </view>
        <view class="request-cal request-tips" v-else-if="form.amount >= form.minAmount">
          <uni-list>
            <uni-list-item title="怎么还" :rightText="form.refund" />
            <uni-list-item showArrow clickable title="借多久" :rightText="form.duration" @click="onShowDurationPicker()" />
            <uni-list-item showArrow clickable title="借款用途" :rightText="form.purpose" @click="onShowPurposePicker()" />
            <uni-list-item showArrow clickable title="收银银行卡" :rightText="`${form.accountBank}(${form.accountNo.substr(-4)})`" />
          </uni-list>
        </view>
      </view>

      <view class="uni-flex uni-column request-from-licence">
        <!--text>提交借款表示您已阅读并同意借款协议</text-->
        <button class="uni-color-warning request-btn" @click="onConfirm">申请借款</button>
      </view>
    </view>

    <!--周期选择-->
    <w-picker mode="selector" :visible.sync="durationPickerVisible" :value="form.duration" default-type="name" :options="durations"
      @confirm="onPickDuration($event, 'selector')"></w-picker>

    <!--目的选择-->
    <w-picker mode="selector" :visible.sync="purposePickerVisible" :value="form.purpose" default-type="name" :options="purposes"
      @confirm="onPickPurpose($event, 'selector')"></w-picker>
  </view>
</template>

<script>
  import ui from '../../../mixins/ui.js';
  import navitator from '../../../mixins/navitator.js';
  import {
    mapGetters
  } from 'vuex';
  import {
    UserActions,
    RequestActions
  } from '../../../store/actions.js';

  export default {
    mixins: [ui, navitator],

    data() {
      return {
        form: {
          amount: 10000,
          minAmount: 10000,
          
          refund: '每月等额,按期还款',
          duration: '12个月',
          purpose: '个人日常消费',
          
          accountBank: undefined,
          accountName: undefined,
          accountNo: undefined,
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
      this.form.accountNo = this.userInfo.bankCard.accountNo;
      this.form.accountName = this.userInfo.bankCard.accountName;
      this.form.accountBank = this.userInfo.bankCard.accountBank;
    },

    methods: {
      onShowLicence() {},

      onShowDurationPicker() {
        this.durationPickerVisible = true;
      },

      onPickDuration(e) {
        this.form.duration = e.result;
      },

      onShowPurposePicker() {
        this.purposePickerVisible = true;
      },

      onPickPurpose(e) {
        this.form.purpose = e.result;
      },

      async onConfirm() {
        try {
          if (this.userInfo.loan) {
            return this.toast('您已有一笔借款申请，请勿重复申请');
          }
          
          const [err, res] = await this.confirm('确定提交申请？');
          if (!res.confirm) return;

          this.showLoading();

          await this.$store.dispatch(RequestActions.CommitRequest, this.form);
          this.$store.dispatch(UserActions.GetUserInfo, {});

          this.toast('提交成功');
          
          this.goToPage("/pages/tabBar/home/home");
        } catch (e) {
          console.error(e);
        }

        this.hideLoading();
      },
    }
  }
</script>

<style>
  @import '../../../common/uni-nvue.css';

  .request-form {}

  .request-input {
    background-color: transparent;
    font-size: 2em;
  }

  .request-tips {
    margin-top: 20upx;
    color: gray;
    background-color: #EFEFEF;
    padding: 30upx;
    font-size: 0.8em;
    border-radius: 10upx;
  }

  .request-cal {
    background-color: white;
    border-radius: 20rpx;
  }

  .request-from-licence {
    margin-top: 100rpx;
    text-align: center;
    font-size: 0.9em;
    color: gray;
  }

  .request-btn {
    width: 100%;
    margin-top: 1em;
    border-radius: 50upx;
  }

  .request-btn::after {
    background-color: #c79448;
    content: '提交借款';
    font-size: 2em;
    color: white;
  }
</style>
