import restClient from '../../utils/restClient.js';

import {
  ParamActions,
} from '../actions';

const params = {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    async [ParamActions.GetParam]({
      getters
    }, payload) {
      return restClient.get('/params/' + payload.name, {});
    },
  }
};

export default params;
