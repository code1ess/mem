import restClient from '../../utils/restClient.js';

import {
  MemRepaymentActions,
} from '../actions';

const repayment = {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    async [MemRepaymentActions.GetRepaymentList]({
      getters
    }, payload) {
      return restClient.get('/repayments', {'per-page': 200});
    },
  }
};

export default repayment;
