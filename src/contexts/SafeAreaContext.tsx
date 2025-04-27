import { createContext, useContext, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

// 安全区域上下文类型
interface SafeAreaContextType {
  top: number;
  bottom: number;
  navBarHeight: number;
  statusBarHeight: number;
  contentHeight: string;
  isIOS: boolean;
  hasNotch: boolean;
}

// 创建上下文
const SafeAreaContext = createContext<SafeAreaContextType>({
  top: 0,
  bottom: 0,
  navBarHeight: 0,
  statusBarHeight: 0,
  contentHeight: '100vh',
  isIOS: false,
  hasNotch: false,
});

// 安全区域提供者属性
interface SafeAreaProviderProps {
  children: React.ReactNode;
}

// 安全区域提供者组件
export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({ children }) => {
  const [safeArea, setSafeArea] = useState<SafeAreaContextType>({
    top: 0,
    bottom: 0,
    navBarHeight: 0,
    statusBarHeight: 0,
    contentHeight: '100vh',
    isIOS: false,
    hasNotch: false,
  });

  useEffect(() => {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight || 0;

    // 获取胶囊按钮位置信息
    const menuButton = Taro.getMenuButtonBoundingClientRect();

    // 计算导航栏高度 (胶囊高度 + 上下边距)
    const paddingTop = menuButton.top - statusBarHeight;
    const navBarHeight = menuButton.height + paddingTop * 2;

    // 获取安全区域
    const safeArea = systemInfo.safeArea || { top: 0, bottom: systemInfo.screenHeight };

    // 计算底部安全区域高度
    const bottomSafeArea = systemInfo.screenHeight - safeArea.bottom;

    // 检测是否为iOS设备
    const isIOS = systemInfo.system && systemInfo.system.toLowerCase().includes('ios');

    // 检测是否有刘海屏/灵动岛
    // 对于iOS设备，如果状态栏高度大于20px，通常意味着有刘海屏或灵动岛
    const hasNotch = isIOS && statusBarHeight > 20;

    // 为有刘海屏的iOS设备增加额外的顶部安全区域
    const extraTopSafeArea = hasNotch ? 10 : 0;
    const adjustedStatusBarHeight = statusBarHeight + extraTopSafeArea;

    // 计算内容区域高度（减去导航栏和底部安全区域）
    const contentHeight = `calc(100vh - ${adjustedStatusBarHeight + navBarHeight}px - ${bottomSafeArea}px)`;

    setSafeArea({
      top: adjustedStatusBarHeight,
      bottom: bottomSafeArea,
      navBarHeight,
      statusBarHeight: adjustedStatusBarHeight,
      contentHeight,
      isIOS,
      hasNotch,
    });
  }, []);

  return (
    <SafeAreaContext.Provider value={safeArea}>
      {children}
    </SafeAreaContext.Provider>
  );
};

// 使用安全区域的Hook
export const useSafeArea = () => useContext(SafeAreaContext);

export default SafeAreaContext;
