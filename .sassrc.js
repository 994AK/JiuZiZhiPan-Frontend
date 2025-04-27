/**
 * Sass配置文件
 * 用于控制Sass编译器的行为
 */
module.exports = {
  // 忽略依赖中的警告
  quietDeps: true,
  // 输出样式
  style: 'compressed',
  // 精确到小数点后几位
  precision: 5,
  // 缓存编译结果
  cache: true,
  // 允许使用@import
  quietDeprecation: true
}
