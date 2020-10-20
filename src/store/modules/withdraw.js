import restClient from '../../utils/restClient.js';

import {
  MemWithdrawActions,
} from '../actions';

const withdraw = {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    async [MemWithdrawActions.CreateMemWithdraw]({
      dispatch,
      commit,
      getters
    }, payload) {
      await restClient.post('/withdraws', payload);
    },
  }
};

export default withdraw;
