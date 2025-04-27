#!/usr/bin/env node

/**
 * 以生产模式运行开发服务器
 * 使用方法: node scripts/dev-prod.js weapp
 */

const { execSync } = require('child_process');
const platform = process.argv[2] || 'weapp';

// 设置环境变量
process.env.NODE_ENV = 'production';

// 执行Taro构建命令
try {
  console.log(`Starting development server in production mode for platform: ${platform}`);
  execSync(`npx taro build --type ${platform} --watch`, { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
} catch (error) {
  console.error('Error running development server:', error);
  process.exit(1);
}
