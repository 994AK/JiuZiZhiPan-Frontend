import './index.scss';

import { Text, View } from '@tarojs/components';

import NavBar from '@/NavBar';

export default function MBTI() {
  return (
    <View className='mbti-page'>
      <NavBar />

      <View className='mbti-content'>
        <Text>MBTI 测评</Text>
      </View>
    </View>
  );
} 