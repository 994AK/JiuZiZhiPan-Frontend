export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/history/index',
    'pages/profile/index',
    'pages/bazi/index',
    'pages/mbti/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#2C1A47',
    navigationBarTitleText: '九紫智盘',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom'
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '主页'
      },
      {
        pagePath: 'pages/history/index',
        text: '历史评测',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的' 
      }
    ]
  }
})