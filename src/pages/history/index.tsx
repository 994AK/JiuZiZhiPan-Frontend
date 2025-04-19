import './index.scss'

import { Text, View } from '@tarojs/components'

import NavBar from '@/NavBar'
import { useLoad } from '@tarojs/taro'

export default function HistoryPage() {
  useLoad(() => {
    console.log('History page loaded.')
  })

  return (
    <View className='history-page'>
      <NavBar />

      <Text className='page-title'>历史评测</Text>
      <View className='coming-soon'>
        <Text className='coming-soon-text'>敬请期待...</Text>
      </View>
    </View>
  )
} 