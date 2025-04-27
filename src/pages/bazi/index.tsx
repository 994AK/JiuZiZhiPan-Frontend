import './index.scss';

import { Button, Picker, Radio, Text, View } from '@tarojs/components';
import { useState } from 'react';

import NavBar from '@/NavBar';
import Taro from '@tarojs/taro';
import { useSafeArea } from '@/contexts/SafeAreaContext';

// 性别选项
const genderOptions = [
  { value: 'male', label: '男' },
  { value: 'female', label: '女' }
];

// 历法选项
const calendarOptions = [
  { value: 'lunar', label: '农历' },
  { value: 'solar', label: '公历' }
];

// 保存的用户信息示例
const savedProfiles = [
  { id: 1, name: '张三', birthYear: 1990, birthMonth: 5, birthDay: 15, birthHour: 14, gender: 'male', calendar: 'solar' },
  { id: 2, name: '李四', birthYear: 1985, birthMonth: 8, birthDay: 22, birthHour: 9, gender: 'female', calendar: 'lunar' }
];

export default function Bazi() {
  // 使用安全区域上下文
  const safeArea = useSafeArea();

  // 表单状态
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('male');
  const [calendar, setCalendar] = useState('solar');
  const [showSavedProfiles, setShowSavedProfiles] = useState(false);

  // 处理出生日期选择
  const handleDateChange = (e) => {
    setBirthDate(e.detail.value);
  };

  // 处理出生时间选择
  const handleTimeChange = (e) => {
    setBirthTime(e.detail.value);
  };

  // 处理性别选择
  const handleGenderChange = (value) => {
    setGender(value);
  };

  // 处理历法选择
  const handleCalendarChange = (value) => {
    setCalendar(value);
  };

  // 处理已保存信息选择
  const handleProfileSelect = (profile) => {
    setName(profile.name);
    // 格式化日期和时间
    const formattedDate = `${profile.birthYear}-${String(profile.birthMonth).padStart(2, '0')}-${String(profile.birthDay).padStart(2, '0')}`;
    const formattedTime = `${String(profile.birthHour).padStart(2, '0')}:00`;

    setBirthDate(formattedDate);
    setBirthTime(formattedTime);
    setGender(profile.gender);
    setCalendar(profile.calendar);
    setShowSavedProfiles(false);
  };

  // 提交表单
  const handleSubmit = () => {
    // 验证表单
    if (!name || !birthDate || !birthTime) {
      Taro.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 构建用户信息对象
    const userInfo = {
      name,
      birthDate,
      birthTime,
      gender,
      calendar
    };

    // 保存用户信息到本地存储
    Taro.setStorageSync('currentUserInfo', userInfo);

    // 导航到八字原盘页面
    Taro.navigateTo({
      url: '/pages/bazi/chart/index'
    });
  };

  return (
    <View className={`bazi-page ${safeArea.hasNotch ? 'ios-notch-padding' : ''}`}>
      <NavBar />

      <View className={`bazi-content ${safeArea.hasNotch ? 'ios-content-padding' : ''}`}>
        <View className='page-header'>
          <Text className='page-title'>八字信息录入</Text>
          <Text className='page-subtitle'>请填写您的出生信息，以便生成精准八字分析</Text>
        </View>

        <View className='form-container'>
          {/* 姓名输入 */}
          <View className='form-item'>
            <Text className='form-label'>姓名</Text>
            <input
              className='form-input'
              type='text'
              placeholder='请输入姓名'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </View>

          {/* 出生日期选择 */}
          <View className='form-item'>
            <Text className='form-label'>出生日期</Text>
            <Picker
              mode='date'
              value={birthDate}
              onChange={handleDateChange}
              className='form-picker'
            >
              <View className='picker-value'>
                {birthDate || '请选择出生日期'}
              </View>
            </Picker>
          </View>

          {/* 出生时间选择 */}
          <View className='form-item'>
            <Text className='form-label'>出生时辰</Text>
            <Picker
              mode='time'
              value={birthTime}
              onChange={handleTimeChange}
              className='form-picker'
            >
              <View className='picker-value'>
                {birthTime || '请选择出生时辰'}
              </View>
            </Picker>
          </View>

          {/* 性别选择 */}
          <View className='form-item'>
            <Text className='form-label'>性别</Text>
            <View className='radio-group'>
              {genderOptions.map(option => (
                <View
                  key={option.value}
                  className={`radio-option ${gender === option.value ? 'selected' : ''}`}
                  onClick={() => handleGenderChange(option.value)}
                >
                  <Radio
                    value={option.value}
                    checked={gender === option.value}
                    color='#00A3B4'
                  />
                  <Text className='radio-label'>{option.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 历法选择 */}
          <View className='form-item'>
            <Text className='form-label'>历法</Text>
            <View className='radio-group'>
              {calendarOptions.map(option => (
                <View
                  key={option.value}
                  className={`radio-option ${calendar === option.value ? 'selected' : ''}`}
                  onClick={() => handleCalendarChange(option.value)}
                >
                  <Radio
                    value={option.value}
                    checked={calendar === option.value}
                    color='#00A3B4'
                  />
                  <Text className='radio-label'>{option.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 已保存信息 */}
          <View className='saved-profiles'>
            <View
              className='saved-profiles-toggle'
              onClick={() => setShowSavedProfiles(!showSavedProfiles)}
            >
              <Text className='toggle-text'>选择已保存的信息</Text>
              <Text className='toggle-icon'>{showSavedProfiles ? '↑' : '↓'}</Text>
            </View>

            {showSavedProfiles && (
              <View className='profiles-list'>
                {savedProfiles.map(profile => (
                  <View
                    key={profile.id}
                    className='profile-item'
                    onClick={() => handleProfileSelect(profile)}
                  >
                    <Text className='profile-name'>{profile.name}</Text>
                    <Text className='profile-info'>
                      {`${profile.calendar === 'lunar' ? '农历' : '公历'} ${profile.birthYear}年${profile.birthMonth}月${profile.birthDay}日 ${profile.gender === 'male' ? '男' : '女'}`}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* 提交按钮 */}
          <Button
            className='submit-button'
            onClick={handleSubmit}
          >
            生成八字
          </Button>
        </View>
      </View>
    </View>
  );
}