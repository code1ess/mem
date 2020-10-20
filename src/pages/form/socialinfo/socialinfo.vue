<template>
  <view class="uni-container">
    <uni-section title="个人信息" type="line"></uni-section>
    <evan-form :hide-required-asterisk="false" ref="form" :model="socialInfo">
      <evan-form-item label="家庭住址：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.personalAddr"
          placeholder="请输入家庭住址" />
      </evan-form-item>
      <evan-form-item label="工作单位：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.workUnit" placeholder="请输入工作单位" />
      </evan-form-item>
      <evan-form-item label="单位住址：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.workAddress"
          placeholder="请输入单位住址" />
      </evan-form-item>
      <evan-form-item label="单位电话：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.workUnitTel"
          placeholder="请输入单位电话" />
      </evan-form-item>
      <evan-form-item label="单位类别：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.workUnitType"
          placeholder="请选择单位类别" readonly @click="onShowActionSheet(workUnitTypes, 'workUnitType')" />
      </evan-form-item>
      <evan-form-item label="年 收 入：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.salaryPerYear"
          placeholder="请选择年收入" readonly @click="onShowActionSheet(salaryRanges, 'salaryPerYear')" />
      </evan-form-item>
      <evan-form-item label="婚姻状况：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.marriage" placeholder="请选择婚姻状况"
          readonly @click="onShowActionSheet(marriageTypes, 'marriage')" />
      </evan-form-item>
      <evan-form-item label="住宅性质：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.residentialNature"
          placeholder="请选择住宅性质" readonly @click="onShowActionSheet(residentialNatureTypes, 'residentialNature')" />
      </evan-form-item>
      <evan-form-item label="教育程度：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.edu" placeholder="请选择教育程度"
          readonly @click="onShowActionSheet(eduTypes, 'edu')" />
      </evan-form-item>
      <evan-form-item label="社会身份：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.socialIdentity"
          placeholder="请选择社会身份" readonly @click="onShowActionSheet(socialIdentityTypes, 'socialIdentity')" />
      </evan-form-item>
    </evan-form>

    <uni-section title="联系人一" type="line"></uni-section>
    <evan-form :model="userInfo.socialInfo">
      <evan-form-item label="关系：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.contact1Relation"
          placeholder="请选择联系人一关系" readonly @click="onShowActionSheet(relationTypes, 'contact1Relation')" />
      </evan-form-item>
      <evan-form-item label="姓名：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.contact1Name"
          placeholder="联系人一姓名" />
      </evan-form-item>
      <evan-form-item label="电话：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.contact1Tel"
          placeholder="联系人一电话" />
      </evan-form-item>
    </evan-form>

    <uni-section title="联系人二" type="line"></uni-section>
    <evan-form :model="userInfo.socialInfo">
      <evan-form-item label="关系：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.contact2Relation"
          placeholder="请选择联系人关系" readonly @click="onShowActionSheet(relationTypes, 'contact2Relation')" />
      </evan-form-item>
      <evan-form-item label="姓名：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.contact2Name"
          placeholder="联系人二姓名" />
      </evan-form-item>
      <evan-form-item label="电话：">
        <input class="form-input" placeholder-class="form-input-placeholder" v-model="socialInfo.contact2Tel"
          placeholder="联系人二电话" />
      </evan-form-item>
    </evan-form>

    <button class="add-btn" type="warn" @click="onSave">保存</button>
  </view>
</template>

<script>
  import ui from '../../../mixins/ui.js';
  import navitator from '../../../mixins/navitator.js';
  
  import utils from '@/components/evan-form/utils.js'
  import EvanForm from '../../../components/evan-form/evan-form.vue';
  import EvanFormItem from '../../../components/evan-form-item/evan-form-item.vue';
  import {UserActions} from '../../../store/actions.js';
  import {
    mapGetters
  } from 'vuex';

  export default {
    mixins: [ui, navitator],

    components: {
      EvanForm,
      EvanFormItem
    },

    data() {
      return {
        autoJump: false,
        socialInfo: {
          personalAddr: undefined,
          workUnit: undefined,
          workAddress: undefined,
          workUnitTel: undefined,
          workUnitType: undefined,

          salaryPerYear: undefined,
          marriage: undefined,
          edu: undefined,
          residentialNature: undefined,
          socialIdentity: undefined,

          contact1Relation: undefined,
          contact1Name: undefined,
          contact1Tel: undefined,

          contact2Relation: undefined,
          contact2Name: undefined,
          contact2Tel: undefined,
        },

        workUnitTypes: ['公务员/事业机关', '国有企业', '民营企业', '外资/独资企业', '个体工商户', '其他'],
        salaryRanges: ['5万以下', '5万-10万', '10万-20万', '20万-30万', '30万以上'],
        marriageTypes: ['未婚', '已婚', '离异', '其他'],
        residentialNatureTypes: ['自有无按揭', '按揭住宅', '单位分配', '租房', '与父母同住', '其他'],
        eduTypes: ['硕士及以上', '大学本科', '大学专科', '高中/中专', '初中或以下'],
        socialIdentityTypes: ['个体户/企业负责人', '销售/中介/业务代表/保险代理人', '工人', '营业员/服务员/收银员/快递服务从业人员', '公务员/教育/医生/其他公职人员',
          '企业一般员工', '企业管理层', '学生'
        ],
        relationTypes: ['亲属', '朋友', '同事', '其他']
      }
    },

    computed: {
      ...mapGetters(['userInfo']),
    },

    onLoad(options) {
      if (this.userInfo.socialInfo) {
        this.socialInfo = this.userInfo.socialInfo;
      }
      
      // 是否自动跳转到下一个页面
      this.autoJump = parseInt(options.checkForm || 0);
    },

    methods: {
      onShowActionSheet(items, field) {
        const self = this;
        uni.showActionSheet({
          itemList: items,
          success: function(res) {
            self.socialInfo[field] = items[res.tapIndex];
            // console.log(self.socialInfo[field]);
          }
        });
      },

      async onSave() {
        try {
          const [err, res] = await this.confirm('请确保填写内容的完整性，以免影响您的贷款审核，确定提交？', '操作确认');
          if (!res.confirm) return;
          
          this.showLoading();
          
          await this.$store.dispatch(UserActions.UpdateSocialInfo, this.socialInfo);
          this.$store.dispatch(UserActions.GetUserInfo, {});
          
          this.toast('保存成功');
          
          if (this.autoJump) this.checkForm(false);
        } catch(e) {
          console.error(e);
        }
        
        this.hideLoading();
      }
    }
  }
</script>

<style>
  @import '../../../common/uni-nvue.css';

  .evan-form-show {
    padding: 0 30rpx;
    background-color: #fff;

    .form-input {
      font-size: 28rpx;
      color: #333;
      text-align: right;
      width: 100%;
      box-sizing: border-box;
      height: 60rpx;

      &.textarea {
        height: 240rpx;
        padding: 24rpx 0;
        text-align: left;
      }
    }

    .form-input-placeholder {
      font-size: 28rpx;
      color: #999;
    }

    &__button {
      width: 100%;
      height: 88rpx;
      border-radius: 8rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      font-size: 36rpx;
      color: #fff;
      margin-top: 20rpx;
      background-color: #2D87D5;

      &::before,
      &::after {
        border: none;
      }
    }

    .customize-form-item {
      &__label {
        font-size: 28rpx;
        color: #333;
        margin-bottom: 16rpx;
      }

      &__radio {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;

        &__text {
          font-size: 28rpx;
          color: #333;
        }
      }
    }

    .add-btn {
      width: 100%;
      margin-top: 1em;
      border-radius: 50upx;
    }

    .add-btn::after {
      background-color: #c79448;
      content: '保存';
      font-size: 2em;
      color: white;
    }
  }
</style>
