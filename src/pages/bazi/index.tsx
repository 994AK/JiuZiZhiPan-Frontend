import './index.scss';

import { Text, View } from '@tarojs/components';

import NavBar from '@/NavBar';

export default function Bazi() {
  return (
    <View className='bazi-page'>
      <NavBar />

      <View className='bazi-content'>
        <Text>八字 测评</Text>
      </View>
    </View>
  );
} 