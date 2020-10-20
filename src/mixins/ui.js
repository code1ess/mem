/**
 * ui 反馈相关。
 */
const ui = {
  methods: {
    toast(title, icon = 'none', mask = true, position = 'bottom', duration = 1500) {
      uni.showToast({
        title: title,
        icon: icon,
        mask: mask,
        position: position,
        duration: duration
      })
    },

    showLoading(title = '执行中...') {
      uni.showLoading({
        title: title
      });
    },

    hideLoading() {
      uni.hideLoading();
    },

    confirm(content, title, confirmText = "确定") {
      return uni.showModal({
        title: title,
        content: content,
        showCancel: true,
        confirmText: confirmText
      });
    },
  }
};

export default ui;
