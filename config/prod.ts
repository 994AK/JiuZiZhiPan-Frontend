import type { UserConfigExport } from "@tarojs/cli"

export default {
  mini: {
    // 生产环境下的特殊配置
    webpackChain(chain) {
      // 生产环境下启用压缩
      chain.optimization.minimize(true)

      // 添加terser插件
      if (chain.optimization.minimizers.has('terser')) {
        chain.optimization.minimizer('terser').tap(args => {
          const terserOptions = args[0].terserOptions || {}
          terserOptions.compress = {
            ...terserOptions.compress,
            drop_console: true, // 移除console
            drop_debugger: true, // 移除debugger
            pure_funcs: ['console.log', 'console.info'] // 移除特定函数调用
          }
          args[0].terserOptions = terserOptions
          return args
        })
      }
    },
    // 配置小程序打包优化
    optimizeMainPackage: {
      enable: true, // 优化主包体积
    },
    // 配置代码分割
    miniCssExtractPluginOption: {
      ignoreOrder: true, // 忽略CSS顺序冲突警告
    }
  },
  h5: {
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    webpackChain(chain) {
      // 生产环境下启用压缩
      chain.optimization.minimize(true)

      // 配置terser压缩选项
      if (chain.optimization.minimizers.has('terser')) {
        chain.optimization.minimizer('terser').tap(args => {
          const terserOptions = args[0].terserOptions || {}
          terserOptions.compress = {
            ...terserOptions.compress,
            drop_console: true, // 移除console
            drop_debugger: true, // 移除debugger
            pure_funcs: ['console.log', 'console.info'] // 移除特定函数调用
          }
          args[0].terserOptions = terserOptions
          return args
        })
      }

      /**
       * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
       * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
       */
      // chain.plugin('analyzer')
      //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    }
  }
} satisfies UserConfigExport<'webpack5'>
