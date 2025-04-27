import './index.scss'

import { Swiper, SwiperItem, Text, View } from '@tarojs/components'
import {
  StarOutlined,
  DiamondOutlined,
  FireOutlined,
  FlowerOutlined,
  LocationOutlined,
  CommentOutlined,
  LikeOutlined,
  UserOutlined
} from '@taroify/icons'

import NavBar from '@/NavBar'
import Taro from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import { useSafeArea } from '@/contexts/SafeAreaContext'
import { useEffect, useState } from 'react'

// 核心功能模块数据
const coreFeatures = [
  {
    id: 'bazi',
    name: '四柱八字',
    description: '探索命运密码，解读人生轨迹',
    url: '/pages/bazi/index'
  },
  {
    id: 'mbti',
    name: 'MBTI人格测试',
    description: '了解自我性格，发现内在潜能',
    url: '/pages/mbti/index'
  }
]

// 即将开放功能模块数据
const upcomingFeatures = [
  {
    id: 'ziwei',
    name: '紫微斗数',
    icon: <StarOutlined color='#E0E6ED' size={40} />,
    isAvailable: false
  },
  {
    id: 'liuyao',
    name: '六爻纳甲',
    icon: <DiamondOutlined color='#E0E6ED' size={40} />,
    isAvailable: false
  },
  {
    id: 'meihua',
    name: '梅花易数',
    icon: <FlowerOutlined color='#E0E6ED' size={40} />,
    isAvailable: false
  },
  {
    id: 'qimen',
    name: '奇门遁甲',
    icon: <LocationOutlined color='#E0E6ED' size={40} />,
    isAvailable: false
  },
  {
    id: 'fire',
    name: '火珠林',
    icon: <FireOutlined color='#E0E6ED' size={40} />,
    isAvailable: false
  },
  {
    id: 'qigong',
    name: '命理气功',
    icon: <StarOutlined color='#E0E6ED' size={40} />,
    isAvailable: false
  }
]

// 用户评价数据
const testimonials = [
  {
    id: 1,
    name: '李先生',
    content: '八字分析非常准确，对我的性格和职业发展方向描述得很到位，推荐给身边的朋友了！',
    rating: 5
  },
  {
    id: 2,
    name: '张女士',
    content: 'MBTI测试结果与我的实际性格非常符合，结合八字分析更是让我对自己有了全新的认识。',
    rating: 5
  },
  {
    id: 3,
    name: '王先生',
    content: '界面设计很精美，操作简单直观，分析报告内容丰富且有深度，值得一试！',
    rating: 4
  }
]

export default function Index() {
  useLoad(() => {
    console.log('Index page loaded.')
  })

  // 使用安全区域上下文
  const safeArea = useSafeArea()

  // 星空动画状态
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([])
  const [shootingStars, setShootingStars] = useState<Array<{id: number, x: number, y: number, delay: number, duration: number}>>([])

  // 生成随机星星
  useEffect(() => {
    const generateStars = () => {
      const newStars: Array<{id: number, x: number, y: number, size: number, opacity: number}> = []
      for (let i = 0; i < 70; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2
        })
      }
      setStars(newStars)
    }

    // 生成流星
    const generateShootingStars = () => {
      const newShootingStars: Array<{id: number, x: number, y: number, delay: number, duration: number}> = []
      for (let i = 0; i < 3; i++) {
        newShootingStars.push({
          id: i,
          x: Math.random() * 30,
          y: Math.random() * 30,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 6
        })
      }
      setShootingStars(newShootingStars)
    }

    generateStars()
    generateShootingStars()

    // 每10秒更新星星位置，创造闪烁效果
    const starsInterval = setInterval(() => {
      generateStars()
    }, 10000)

    // 每15秒更新流星
    const shootingStarsInterval = setInterval(() => {
      generateShootingStars()
    }, 15000)

    return () => {
      clearInterval(starsInterval)
      clearInterval(shootingStarsInterval)
    }
  }, [])

  // 处理核心功能点击
  const handleCoreFeatureClick = (url: string) => {
    Taro.navigateTo({ url })
  }

  // 处理即将开放功能点击
  const handleUpcomingFeatureClick = () => {
    Taro.showToast({
      title: '功能即将开放，敬请期待',
      icon: 'none',
      duration: 2000
    })
  }

  return (
    <View className={`index ${safeArea.hasNotch ? 'ios-notch-padding' : ''}`}>
      {/* 星空背景 */}
      <View className='starry-background'>
        {stars.map(star => (
          <View
            key={star.id}
            className='star'
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
          />
        ))}
        {/* 流星效果 */}
        {shootingStars.map(shootingStar => (
          <View
            key={`shooting-${shootingStar.id}`}
            className='shooting-star'
            style={{
              left: `${shootingStar.x}%`,
              top: `${shootingStar.y}%`,
              animationDelay: `${shootingStar.delay}s`,
              animationDuration: `${shootingStar.duration}s`
            }}
          />
        ))}
      </View>

      <NavBar />

      {/* 应用名称与slogan */}
      <View className={`page-title-container ${safeArea.hasNotch ? 'ios-content-padding' : ''}`}>
        <Text className='page-title'>九紫智盘</Text>
        <Text className='page-subtitle'>探索命理的奥秘，解读人生密码</Text>
      </View>

      <View className='features-container'>
        {/* 核心功能卡片 */}
        <View className='core-features-section'>
          <Text className='section-title'>核心功能</Text>
          <View className='core-features-grid'>
            {coreFeatures.map(feature => (
              <View
                key={feature.id}
                className='core-feature-card'
                onClick={() => handleCoreFeatureClick(feature.url)}
              >
                <View className='feature-decoration'></View>
                <View className='feature-content'>
                  <Text className='feature-name'>{feature.name}</Text>
                  <Text className='feature-description'>{feature.description}</Text>
                </View>
                <View className='feature-button'>
                  <Text className='button-text'>立即体验</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 即将开放功能网格 */}
        <View className='features-section'>
          <Text className='section-title'>即将开放</Text>
          <View className='features-grid'>
            {upcomingFeatures.map(feature => (
              <View
                key={feature.id}
                className='feature-item unavailable'
                onClick={handleUpcomingFeatureClick}
              >
                <View className='feature-icon'>{feature.icon}</View>
                <Text className='feature-name'>{feature.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 用户评价轮播 */}
        <View className='testimonials-section'>
          <Text className='section-title'>用户评价</Text>
          <Swiper
            className='testimonials-swiper'
            indicatorColor='#13304D'
            indicatorActiveColor='#00A3B4'
            circular
            autoplay
            interval={5000}
            indicatorDots
          >
            {testimonials.map(testimonial => (
              <SwiperItem key={testimonial.id}>
                <View className='testimonial-card'>
                  <View className='testimonial-header'>
                    <View className='testimonial-avatar'>
                      <UserOutlined color='#E6C35C' size={40} />
                    </View>
                    <View className='testimonial-user'>
                      <Text className='testimonial-name'>{testimonial.name}</Text>
                      <View className='testimonial-rating'>
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <LikeOutlined key={i} color='#E6C35C' size={24} />
                        ))}
                      </View>
                    </View>
                  </View>
                  <View className='testimonial-content'>
                    <CommentOutlined color='rgba(0, 163, 180, 0.3)' size={32} className='quote-icon' />
                    <Text className='testimonial-text'>{testimonial.content}</Text>
                  </View>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    </View>
  )
}
