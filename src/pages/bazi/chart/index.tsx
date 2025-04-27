import './index.scss';

import { Button, ScrollView, Text, View } from '@tarojs/components';
import { useState } from 'react';

import NavBar from '@/NavBar';
import Taro from '@tarojs/taro';
import { useSafeArea } from '@/contexts/SafeAreaContext';

// 八字原盘数据示例
const baziChartData = {
  // 用户信息
  userInfo: {
    name: '张三',
    gender: 'male',
    birthDate: '1990-05-15',
    birthTime: '14:30',
    calendar: 'solar'
  },
  // 四柱八字
  baziData: {
    year: { heavenlyStem: '庚', earthlyBranch: '午', hiddenStem: ['丁', '己', '己'] },
    month: { heavenlyStem: '丙', earthlyBranch: '申', hiddenStem: ['戊', '庚', '壬'] },
    day: { heavenlyStem: '辛', earthlyBranch: '酉', hiddenStem: ['辛', '己', '癸'] },
    hour: { heavenlyStem: '壬', earthlyBranch: '戌', hiddenStem: ['戊', '辛', '丁'] }
  },
  // 五行分析
  fiveElements: {
    wood: 0,
    fire: 3,
    earth: 5,
    metal: 4,
    water: 2
  },
  // 日主旺衰
  dayMasterStrength: {
    value: 'weak',
    description: '日主偏弱，五行金生水，需要木来制约'
  },
  // 命局分析
  analysis: {
    personality: '性格沉稳，做事谨慎，有较强的责任感和执行力。金水相生，思维灵活，但土多克水，情绪有时容易波动。',
    career: '适合从事金融、管理、行政等领域工作。事业中需注意与人合作，独立发展较为困难。',
    health: '金旺体质，但水弱，需注意肾脏、泌尿系统保养。',
    relationships: '婚姻宜找木火相助之人，可互补互助。'
  }
};

// 五行颜色映射
const fiveElementColors = {
  wood: '#4CAF50', // 绿色
  fire: '#FF5722', // 红色
  earth: '#FFC107', // 黄色
  metal: '#BDBDBD', // 银色
  water: '#2196F3'  // 蓝色
};

export default function BaziChart() {
  // 使用安全区域上下文
  const safeArea = useSafeArea();

  // 当前选中的分析维度
  const [activeTab, setActiveTab] = useState('personality');

  // 是否展开详情
  const [showDetails, setShowDetails] = useState(false);

  // 处理Tab切换
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 切换详情展示状态
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // 导航到大运流年页面
  const goToFortunePage = () => {
    Taro.navigateTo({
      url: '/pages/bazi/fortune/index'
    });
  };

  // 导航到八字画像页面
  const goToPortraitPage = () => {
    Taro.navigateTo({
      url: '/pages/bazi/portrait/index'
    });
  };

  return (
    <View className={`bazi-chart-page ${safeArea.hasNotch ? 'ios-notch-padding' : ''}`}>
      <NavBar />

      <ScrollView
        className={`bazi-chart-content ${safeArea.hasNotch ? 'ios-content-padding' : ''}`}
        scrollY
      >
        {/* 用户信息 */}
        <View className='user-info-section'>
          <Text className='user-name'>{baziChartData.userInfo.name}</Text>
          <Text className='user-birth'>
            {`${baziChartData.userInfo.calendar === 'lunar' ? '农历' : '公历'} ${baziChartData.userInfo.birthDate} ${baziChartData.userInfo.birthTime}`}
          </Text>
          <Text className='user-gender'>
            {baziChartData.userInfo.gender === 'male' ? '男' : '女'}
          </Text>
        </View>

        {/* 四柱八字图形展示 */}
        <View className='bazi-chart-section'>
          <Text className='section-title'>四柱八字</Text>

          <View className='bazi-pillars'>
            {/* 年柱 */}
            <View className='bazi-pillar'>
              <Text className='pillar-label'>年柱</Text>
              <View className='pillar-content'>
                <Text className='heavenly-stem'>{baziChartData.baziData.year.heavenlyStem}</Text>
                <Text className='earthly-branch'>{baziChartData.baziData.year.earthlyBranch}</Text>
                <View className='hidden-stems'>
                  {baziChartData.baziData.year.hiddenStem.map((stem, index) => (
                    <Text key={index} className='hidden-stem'>{stem}</Text>
                  ))}
                </View>
              </View>
            </View>

            {/* 月柱 */}
            <View className='bazi-pillar'>
              <Text className='pillar-label'>月柱</Text>
              <View className='pillar-content'>
                <Text className='heavenly-stem'>{baziChartData.baziData.month.heavenlyStem}</Text>
                <Text className='earthly-branch'>{baziChartData.baziData.month.earthlyBranch}</Text>
                <View className='hidden-stems'>
                  {baziChartData.baziData.month.hiddenStem.map((stem, index) => (
                    <Text key={index} className='hidden-stem'>{stem}</Text>
                  ))}
                </View>
              </View>
            </View>

            {/* 日柱 */}
            <View className='bazi-pillar day-pillar'>
              <Text className='pillar-label'>日柱</Text>
              <View className='pillar-content'>
                <Text className='heavenly-stem'>{baziChartData.baziData.day.heavenlyStem}</Text>
                <Text className='earthly-branch'>{baziChartData.baziData.day.earthlyBranch}</Text>
                <View className='hidden-stems'>
                  {baziChartData.baziData.day.hiddenStem.map((stem, index) => (
                    <Text key={index} className='hidden-stem'>{stem}</Text>
                  ))}
                </View>
              </View>
            </View>

            {/* 时柱 */}
            <View className='bazi-pillar'>
              <Text className='pillar-label'>时柱</Text>
              <View className='pillar-content'>
                <Text className='heavenly-stem'>{baziChartData.baziData.hour.heavenlyStem}</Text>
                <Text className='earthly-branch'>{baziChartData.baziData.hour.earthlyBranch}</Text>
                <View className='hidden-stems'>
                  {baziChartData.baziData.hour.hiddenStem.map((stem, index) => (
                    <Text key={index} className='hidden-stem'>{stem}</Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* 五行生克关系图解 */}
        <View className='five-elements-section'>
          <Text className='section-title'>五行分析</Text>

          <View className='five-elements-chart'>
            {Object.entries(baziChartData.fiveElements).map(([element, value]) => (
              <View key={element} className='element-bar'>
                <Text className='element-name'>{
                  element === 'wood' ? '木' :
                  element === 'fire' ? '火' :
                  element === 'earth' ? '土' :
                  element === 'metal' ? '金' : '水'
                }</Text>
                <View className='bar-container'>
                  <View
                    className='bar-value'
                    style={{
                      width: `${value * 20}%`,
                      backgroundColor: fiveElementColors[element]
                    }}
                  />
                </View>
                <Text className='element-count'>{value}</Text>
              </View>
            ))}
          </View>

          <View className='day-master-strength'>
            <Text className='strength-label'>日主旺衰：</Text>
            <Text className='strength-value'>
              {baziChartData.dayMasterStrength.value === 'strong' ? '偏强' :
               baziChartData.dayMasterStrength.value === 'weak' ? '偏弱' : '中和'}
            </Text>
            <Text className='strength-description'>{baziChartData.dayMasterStrength.description}</Text>
          </View>
        </View>

        {/* 四大维度内容Tab切换 */}
        <View className='analysis-section'>
          <Text className='section-title'>命局分析</Text>

          <View className='analysis-tabs'>
            <View
              className={`tab-item ${activeTab === 'personality' ? 'active' : ''}`}
              onClick={() => handleTabChange('personality')}
            >
              <Text className='tab-text'>性格</Text>
            </View>
            <View
              className={`tab-item ${activeTab === 'career' ? 'active' : ''}`}
              onClick={() => handleTabChange('career')}
            >
              <Text className='tab-text'>事业</Text>
            </View>
            <View
              className={`tab-item ${activeTab === 'health' ? 'active' : ''}`}
              onClick={() => handleTabChange('health')}
            >
              <Text className='tab-text'>健康</Text>
            </View>
            <View
              className={`tab-item ${activeTab === 'relationships' ? 'active' : ''}`}
              onClick={() => handleTabChange('relationships')}
            >
              <Text className='tab-text'>婚姻</Text>
            </View>
          </View>

          <View className='analysis-content'>
            <Text className='analysis-text'>
              {baziChartData.analysis[activeTab]}
            </Text>

            <View className='details-toggle' onClick={toggleDetails}>
              <Text className='toggle-text'>{showDetails ? '收起详情' : '展开详情'}</Text>
              <Text className='toggle-icon'>{showDetails ? '↑' : '↓'}</Text>
            </View>

            {showDetails && (
              <View className='analysis-details'>
                <Text className='details-text'>
                  {/* 这里可以添加更详细的分析内容 */}
                  根据您的八字命盘，{activeTab === 'personality' ? '您的性格特点主要受金水影响，表现为思维灵活、善于沟通，但有时缺乏坚持性。金代表坚毅和条理，水代表智慧和灵活，这使您在处理问题时既有条理又不失变通。' :
                  activeTab === 'career' ? '您的事业发展适合在需要细致和分析能力的领域，如金融、数据分析、行政管理等。您的职业生涯中期可能会有较大变动，40岁后事业会趋于稳定。' :
                  activeTab === 'health' ? '您的健康状况需要注意肺部和肾脏系统，建议定期检查并保持良好的作息习惯。饮食上宜清淡，避免过于寒凉和刺激性食物。' :
                  '您的婚姻关系中需要寻找能够互补的伴侣，木火属性的人可能更适合您。婚姻生活中需要注意沟通方式，避免过于理性而忽略情感表达。'}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 功能按钮区 */}
        <View className='function-buttons'>
          <Button className='function-button' onClick={goToFortunePage}>
            查看大运流年
          </Button>
          <Button className='function-button' onClick={goToPortraitPage}>
            生成八字画像
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
