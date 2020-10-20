import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 动态导入模块
function loadModules() {
  const context = require.context("./modules", false, /([a-z_]+)\.js$/i)

  const modules = context
    .keys()
    .map((key) => ({
      key,
      name: key.match(/([a-z_]+)\.js$/i)[1]
    }))
    .reduce(
      (modules, {
        key,
        name
      }) => ({
        ...modules,
        [name]: context(key).default
      }), {}
    )

  return {
    context,
    modules
  };
}

const {
  context,
  modules
} = loadModules();

const store = new Vuex.Store({
  modules,
  getters: {}
});

export default store
