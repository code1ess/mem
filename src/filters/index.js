/**
 * 全局过滤器。
 */
export {
  parseTime,
  formatTime
} from '../utils';

/**
 * 复数化。
 *
 * @param time
 * @param label
 */
function pluralize(time, label) {
  if (time === 1) return time + label;

  return time + label + '秒'
}

/**
 * 数字格式化。
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ];

  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
    }
  }

  return num.toString();
}

/**
 * 千位转化。
 */
export function toThousandFilter(num) {
  return (num + '' || '0.00').toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 银行卡格式化。
 */
export function formatBankCard(value) {
  return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
}

// 多久之前
export function ta(time) {
  return format(time, "zh_CN");
}

// 会员应用ID
const Apps = {
  ['com.skynet.member']: {
    text: '飞迈',
    tagType: 'primary'
  },
  ['com.skynet.entrusted']: {
    text: '飞迈(代)',
    tagType: 'success'
  }
};

export function appText(appId) {
  return Apps[appId] ? Apps[appId].text : appId;
}

export function appTagType(appId) {
  return Apps[appId] ? Apps[appId].tagType : '';
}

// 商户状态。
const MchStatus = {
  [0]: {
    text: '删除',
    tagType: "danger"
  },
  [10]: {
    text: '正常',
    tagType: "success"
  },
  [20]: {
    text: '冻结',
    tagType: "warning"
  }
};

export function mchStatusText(status) {
  return MchStatus[status] ? MchStatus[status].text : "";
};

export function mchStatusTag(status) {
  return MchStatus[status] ? MchStatus[status].tagType : "";
}

// 审计日志方法。
const AuditLogType = {
  ['view']: {
    text: '查看',
    tagType: "info"
  },
  ['create']: {
    text: '创建',
    tagType: "success"
  },
  ['update']: {
    text: '更新',
    tagType: "warning"
  },
  ['delete']: {
    text: '删除',
    tagType: "danger"
  }
};

export function auditLogText(status) {
  return AuditLogType[status] ? AuditLogType[status].text : "";
};

export function auditLogTag(status) {
  return AuditLogType[status] ? AuditLogType[status].tagType : "primary";
};

// 账号类型。
export function accountRolesTag(role) {
};