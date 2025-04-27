import "./index.scss";

import { useEffect, useState } from "react";

import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useSafeArea } from "@/contexts/SafeAreaContext";

export default function NavBar() {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [showBackButton, setShowBackButton] = useState(false);
  const [menuButtonInfo, setMenuButtonInfo] =
    useState<Taro.getMenuButtonBoundingClientRect.Rect | null>(null);

  // 使用安全区域上下文
  const safeArea = useSafeArea();

  // 检测页面栈变化，判断是否显示后退按钮
  const checkBackButtonVisibility = () => {
    const pages = Taro.getCurrentPages();
    setShowBackButton(pages.length > 1);
  };

  useEffect(() => {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync();
    setStatusBarHeight(systemInfo.statusBarHeight || 0);

    // 获取胶囊按钮位置信息
    const menuButton = Taro.getMenuButtonBoundingClientRect();
    setMenuButtonInfo(menuButton);

    // 计算导航栏高度 (胶囊高度 + 上下边距)
    const paddingTop = menuButton.top - (systemInfo.statusBarHeight || 0);
    const navHeight = menuButton.height + paddingTop * 2;
    setNavBarHeight(navHeight);

    // 初始检查后退按钮可见性
    checkBackButtonVisibility();

    // 监听路由变化
    Taro.eventCenter.on("PAGE_SHOW", checkBackButtonVisibility);

    // 组件卸载时移除事件监听
    return () => {
      Taro.eventCenter.off("PAGE_SHOW", checkBackButtonVisibility);
    };
  }, []);

  // 后退按钮点击事件
  const handleBackClick = () => {
    Taro.navigateBack();
  };

  // 计算额外的安全区域高度
  const extraSafeAreaHeight = safeArea.hasNotch ? 25 : 15;
  const totalNavBarHeight = statusBarHeight + navBarHeight + extraSafeAreaHeight;

  return (
    <View
      className={`custom-navbar ${safeArea.hasNotch ? 'has-notch' : ''}`}
      style={{
        height: `${totalNavBarHeight}px`,
      }}
    >
        {showBackButton && menuButtonInfo && (
          <View
            className="back-button"
            onClick={handleBackClick}
            style={{
              top: `${menuButtonInfo.top + extraSafeAreaHeight}px`,
              height: `${menuButtonInfo.height}px`,
              width: `${menuButtonInfo.height}px`,
            }}
          >
            <View className="back-arrow"></View>
          </View>
        )}
    </View>
  );
}
