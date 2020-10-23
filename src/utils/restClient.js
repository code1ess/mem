import store from '@/store';

export default {
  async get(path, data) {
    return this.doRequest('GET', path, data);
  },

  async post(path, data) {
    return this.doRequest('POST', path, data);
  },

  async put(path, data) {
    return this.doRequest('PUT', path, data);
  },

  async del(path, data) {
    return this.doRequest('DELETE', path, data);
  },

  async doRequest(method, path, data) {
    const header = {
      'content-type': 'application/json',
    };
    if (store.getters.userInfo.accessToken) {
      header['Authorization'] = 'Bearer ' + store.getters.userInfo.accessToken
    }

    // API 前缀从当前文档的源中提取，避免配置麻烦
    let apiPrefix = process.env.VUE_APP_API_PREFIX || window.location.origin;
    apiPrefix = apiPrefix.replace(':8080', '');
    apiPrefix = apiPrefix.replace('/#', '');

    const [error, res] = await uni.request({
      url: apiPrefix + path,
      method: method,
      header: header,
      data: data
    });

    // console.debug('请求路径：' + method + ': ' + path + '，参数: ' + JSON.stringify(data || {}));
    if (error) {
      console.error('请求出错: ', error);

      uni.showToast({
        title: error ? error.message : '未知错误',
        icon: 'none'
      });

      throw error;
    } else if (!res.data) {
      console.error('请求异常：', res);
    } else if (!res.data.success) {
      console.error('请求异常：', res);

      uni.showToast({
        title: res.data.payload.message,
        icon: 'none'
      });

      if (401 == res.data.payload.status) {
        uni.navigateTo({
          url: '/pages/auth/sign-in'
        });
      }

      throw new Error(res.data.payload.message);
    } else {
      // console.info('请求成功: ', res);

      return res.data.payload;
    }
  }
}
