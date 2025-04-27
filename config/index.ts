import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import * as path from 'path'
import devConfig from './dev'
import prodConfig from './prod'

// 导入自定义插件
const SuppressWarningsPlugin = require('./plugins/SuppressWarningsPlugin')

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'MicroApp',
    date: '2025-4-4',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {
    },
    copy: {
      patterns: [
      ],
      options: {
      }
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: true // Webpack 持久化缓存配置，建议开启
    },
    mini: {
      optimizeMainPackage: {
        enable: true, // 优化主包体积
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)

        // 忽略Sass @import警告
        // 添加全局Sass配置
        chain.module
          .rule('sass')
          .oneOf('normal')
          .use('sass-loader')
          .tap((options: any) => {
            return {
              ...options,
              sassOptions: {
                ...options?.sassOptions,
                quietDeps: true, // 忽略依赖中的警告
              }
            };
          });

        // 同样为css模块添加配置
        chain.module
          .rule('sass')
          .oneOf('modules')
          .use('sass-loader')
          .tap((options: any) => {
            return {
              ...options,
              sassOptions: {
                ...options?.sassOptions,
                quietDeps: true, // 忽略依赖中的警告
              }
            };
          });

        // 添加警告过滤插件
        chain.plugin('suppress-warnings-plugin').use(SuppressWarningsPlugin, [{
          test: /Sass @import rules are deprecated/
        }]);
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            // 设计稿尺寸
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)

        // 忽略Sass @import警告
        // 添加全局Sass配置
        chain.module
          .rule('sass')
          .oneOf('normal')
          .use('sass-loader')
          .tap((options: any) => {
            return {
              ...options,
              sassOptions: {
                ...options?.sassOptions,
                quietDeps: true, // 忽略依赖中的警告
              }
            };
          });

        // 同样为css模块添加配置
        chain.module
          .rule('sass')
          .oneOf('modules')
          .use('sass-loader')
          .tap((options: any) => {
            return {
              ...options,
              sassOptions: {
                ...options?.sassOptions,
                quietDeps: true, // 忽略依赖中的警告
              }
            };
          });

        // 添加警告过滤插件
        chain.plugin('suppress-warnings-plugin').use(SuppressWarningsPlugin, [{
          test: /Sass @import rules are deprecated/
        }]);
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }


  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
