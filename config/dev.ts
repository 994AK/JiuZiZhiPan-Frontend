import type { UserConfigExport } from "@tarojs/cli"

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {
    compile: {
      exclude: [
        path => path.includes('node_modules') && !path.includes('@tarojs')
      ],
      include: []
    },
    webpackChain(chain) {
      // 开发环境下禁用压缩，加快编译速度
      chain.optimization.minimize(false)

      // 开发环境下启用source-map，方便调试
      chain.devtool('cheap-module-source-map')
    }
  },
  h5: {
    devServer: {
      hot: true, // 启用热更新
      open: false, // 不自动打开浏览器
      historyApiFallback: true, // 支持history路由
      compress: true, // 启用gzip压缩
    }
  }
} satisfies UserConfigExport<'webpack5'>
