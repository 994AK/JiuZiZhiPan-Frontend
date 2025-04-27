import './index.scss'

import { Text, View } from '@tarojs/components'

import NavBar from '@/NavBar'
import { useLoad } from '@tarojs/taro'
import { useSafeArea } from '@/contexts/SafeAreaContext'

export default function ProfilePage() {
  useLoad(() => {
    console.log('Profile page loaded.')
  })

  // 使用安全区域上下文
  const safeArea = useSafeArea()

  return (
    <View className={`profile-page ${safeArea.hasNotch ? 'ios-notch-padding' : ''}`}>
      <NavBar />
      <Text className={`page-title ${safeArea.hasNotch ? 'ios-content-padding' : ''}`}>我的</Text>
      <View className='coming-soon'>
        <Text className='coming-soon-text'>敬请期待...</Text>
      </View>
    </View>
  )
}