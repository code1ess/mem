/**
 * store 动作定义。
 */

// 会员提现
export const MemWithdrawActions = {
  GetMemWithdrawList: 'GetMemWithdrawList',
  CreateMemWithdraw: 'CreateMemWithdraw',
  DeleteMemWithdraw: 'DeleteMemWithdraw',
};

export const MemWithdrawMutations = {
  SetMemWithdrawList: 'SetMemWithdrawList',
};

// 借款申请
export const RequestActions = {
  CommitRequest: 'CommitRequest'
};

export const RequestMutations = {};

// 借款合同
export const ContractActions = {
  GetContract: 'GetContract'
};

// 还款列表
export const MemRepaymentActions = {
  GetRepaymentList: 'GetRepaymentList'
};

// App 版本
export const MemAppActions = {
  GetVersions: 'GetVersions',
  CreateVersion: 'CreateVersion',
  UpdateVersion: 'UpdateVersion',
  DeleteVersion: 'DeleteVersion',
};

// 用户
export const UserActions = {
  UserSignUp: 'UserSignUp',
  UserSignIn: 'UserSignIn',
  UserSignOut: 'UserSignOut',
  GetUserInfo: 'GetUserInfo',
  
  UpdatePwd: 'UpdatePwd',
  UpdateIdCard: 'UpdateIdCard',
  UpdateBankCard: 'UpdateBankCard',
  UpdateSocialInfo: 'UpdateSocialInfo',
};

export const UserMutations = {
  SetUserInfo: 'SetUserInfo',
};

// 系统参数
export const ParamActions = {
  GetParam: 'GetParam',
};