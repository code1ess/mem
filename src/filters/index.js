/**
 * 全局过滤器。
 */

/**
 * 千位转化。
 */
export function toThousandFilter(num) {
  return (num + '' || '0.00').toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
