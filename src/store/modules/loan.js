import restClient from '../../utils/restClient.js';

import {
  RequestActions,
  RequestMutations
} from '../actions';

const lnRequest = {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    async [RequestActions.CommitRequest]({
      dispatch,
      commit,
      getters
    }, payload) {
      await restClient.post('/requests', payload);
    },
  }
};

export default lnRequest;
