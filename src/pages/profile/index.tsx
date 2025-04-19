import './index.scss'

import { Text, View } from '@tarojs/components'

import NavBar from '@/NavBar'
import { useLoad } from '@tarojs/taro'

export default function ProfilePage() {
  useLoad(() => {
    console.log('Profile page loaded.')
  })

  return (
    <View className='profile-page'>
      <NavBar />
      <Text className='page-title'>我的</Text>
      <View className='coming-soon'>
        <Text className='coming-soon-text'>敬请期待...</Text>
      </View>
    </View>
  )
} 