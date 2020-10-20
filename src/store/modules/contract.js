import restClient from '../../utils/restClient.js';

import {
  ContractActions,
} from '../actions';

const params = {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    async [ContractActions.GetContract]({
      getters
    }, payload) {
      return restClient.get('/contracts/member', {});
    },
  }
};

export default params;
