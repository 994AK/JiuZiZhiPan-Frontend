/**
 * 抑制特定警告的Webpack插件
 * 用于过滤掉不需要的警告信息
 */
class SuppressWarningsPlugin {
  constructor(options = {}) {
    this.options = options;
    this.test = options.test || /./;
  }

  apply(compiler) {
    compiler.hooks.done.tap('SuppressWarningsPlugin', stats => {
      if (stats.hasWarnings()) {
        // 过滤掉匹配的警告
        stats.compilation.warnings = stats.compilation.warnings.filter(warning => {
          return !this.test.test(warning.message || warning);
        });
      }
    });
  }
}

module.exports = SuppressWarningsPlugin;
