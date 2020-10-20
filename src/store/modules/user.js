import restClient from '../../utils/restClient.js';

import {
  UserActions,
  UserMutations
} from '../actions';

const MCH_ID = 'CBF20224';
const USER_INFO_LC_KEY = 'UserInfo';

function getLocalUserInfo() {
  let userInfo = uni.getStorageSync(USER_INFO_LC_KEY);
  // console.log(userInfo);

  if (userInfo) return JSON.parse(userInfo);

  return {
    id: undefined,
    headimgUrl: '../../../static/my/head.png',
    mobile: undefined,
    nickname: undefined,
    accessToken: undefined
  };
}

function clearLocalUserInfo() {
  uni.removeStorageSync(USER_INFO_LC_KEY);
}

const user = {
  state: {
    userInfo: {
      id: undefined,
      headimgUrl: '',
      mobile: undefined,
      nickname: undefined,
      accessToken: undefined
    }
  },

  getters: {
    userInfo(state) {
      if (!state.userInfo.id) state.userInfo = getLocalUserInfo();

      return state.userInfo;
    },

    isSignIn(state, getters) {
      return getters.userInfo.accessToken;
    },
  },

  mutations: {
    [UserMutations.SetUserInfo](state, payload) {
      // if (!payload || !payload.id) return;

      const data = payload.id ? {
        ...state.userInfo,
        ...payload,
      } : {};
      state.userInfo = data;
      
      // console.log('payload: ', payload);
      // console.log('data: ', data);

      uni.setStorageSync(USER_INFO_LC_KEY, JSON.stringify(data));
    }
  },

  actions: {
    async [UserActions.UserSignUp]({
      dispatch,
      commit,
      getters
    }, payload) {
      const userInfo = await restClient.post('/users/sign-up', payload);
    },

    async [UserActions.UserSignIn]({
      dispatch,
      commit
    }, payload) {
      const userInfo = await restClient.post('/users/sign-in', payload);

      commit(UserMutations.SetUserInfo, userInfo);
      
      return userInfo;
    },

    async [UserActions.UserSignOut]({
      commit,
      state
    }) {
      restClient.post('/users/sign-out');

      commit(UserMutations.SetUserInfo, {});
      clearLocalUserInfo();
    },

    async [UserActions.GetUserInfo]({
      getters,
      commit
    }) {
      if (!getters.isSignIn) return;

      const userInfo = await restClient.get(`/users/${getters.userInfo.id}`);

      commit(UserMutations.SetUserInfo, userInfo);
    },

    async [UserActions.ClearCache]() {
      clearLocalUserInfo();
    },

    async [UserActions.UpdatePwd]({
      commit,
      getters
    }, payload) {
      return restClient.put(`/users/${getters.userInfo.id}`, {
        action: 'UpdatePwd',
        payload: payload
      });
    },

    async [UserActions.UpdateIdCard]({
      commit,
      getters
    }, payload) {
      const userInfo = await restClient.put(`/users/${getters.userInfo.id}`, {
        action: 'UpdateIdCard',
        payload
      });

      commit(UserMutations.SetUserInfo, userInfo);
    },

    async [UserActions.UpdateBankCard]({
      commit,
      getters
    }, payload) {
      const userInfo = await restClient.put(`/users/${getters.userInfo.id}`, {
        action: 'UpdateBankCard',
        payload
      });

      commit(UserMutations.SetUserInfo, userInfo);
    },

    async [UserActions.UpdateSocialInfo]({
      commit,
      getters
    }, payload) {
      const userInfo = await restClient.put(`/users/${getters.userInfo.id}`, {
        action: 'UpdateSocialInfo',
        payload
      });

      commit(UserMutations.SetUserInfo, userInfo);
    },
  }
};

export default user;
