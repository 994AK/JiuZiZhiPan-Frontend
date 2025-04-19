import './index.scss'

import { Text, View } from '@tarojs/components'

import NavBar from '@/NavBar'
import Taro from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'

export default function Index() {
  useLoad(() => {
    console.log('Index page loaded.')
  })
  
  return (
    <View className='index'>
      <NavBar />  
      <View className='button-container'>
        <View className='test-button mbti-button' onClick={() => Taro.navigateTo({ url: '/pages/mbti/index' })}>
          <Text>MBTI 评测</Text>
        </View>
        
        <View className='test-button bazi-button' onClick={() => Taro.navigateTo({ url: '/pages/bazi/index' })}>
          <Text>八字 评测</Text>
        </View>
      </View>
    </View>
  )
}
