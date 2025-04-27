import './index.scss';

import { Text, View } from '@tarojs/components';

import NavBar from '@/NavBar';
import { useSafeArea } from '@/contexts/SafeAreaContext';

export default function MBTI() {
  // 使用安全区域上下文
  const safeArea = useSafeArea();
  return (
    <View className={`mbti-page ${safeArea.hasNotch ? 'ios-notch-padding' : ''}`}>
      <NavBar />

      <View className={`mbti-content ${safeArea.hasNotch ? 'ios-content-padding' : ''}`}>
        <Text>MBTI 测评</Text>
      </View>
    </View>
  );
}