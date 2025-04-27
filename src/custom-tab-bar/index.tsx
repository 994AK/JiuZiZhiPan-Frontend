import "./index.scss";

import {
  HomeOutlined,
  UnderwayOutlined,
  RecordsOutlined,
  UserOutlined,
} from "@taroify/icons";
import { Text, View } from "@tarojs/components";
import { useEffect, useState } from "react";

import Taro from "@tarojs/taro";
import globalStore from "@/store/global";
import { observer } from "mobx-react";
import { useSafeArea } from "@/contexts/SafeAreaContext";

const tabsInfo = [
  {
    pagePath: "pages/index/index",
    text: "首页",
    icon: <HomeOutlined color="#E0E6ED" size={28} />,
    selectedIcon: <HomeOutlined color="#00A3B4" size={28} />,
  },
  {
    pagePath: "pages/history/index",
    text: "历史",
    icon: <UnderwayOutlined color="#E0E6ED" size={28} />,
    selectedIcon: <UnderwayOutlined color="#00A3B4" size={28} />,
  },
  {
    pagePath: "pages/bazi/index",
    text: "测试",
    icon: <RecordsOutlined color="#E0E6ED" size={28} />,
    selectedIcon: <RecordsOutlined color="#00A3B4" size={28} />,
  },
  {
    pagePath: "pages/profile/index",
    text: "我的",
    icon: <UserOutlined color="#E0E6ED" size={28} />,
    selectedIcon: <UserOutlined color="#00A3B4" size={28} />,
  },
];

function CustomTabBar() {
  const [selected, setSelected] = useState(0);

  // 使用安全区域上下文
  const safeArea = useSafeArea();

  const switchTab = (index) => {
    if (globalStore.currentTab !== index) {
      globalStore.setCurrentTab(index);
      Taro.switchTab({
        url: "/" + tabsInfo[index].pagePath,
      });
    }
  };

  useEffect(() => {
    const page = Taro.getCurrentInstance().page;
    if (page) {
      const currentPageUrl = page.route;
      for (let i = 0; i < tabsInfo.length; i++) {
        if (tabsInfo[i].pagePath === currentPageUrl) {
          setSelected(i);
          break;
        }
      }
    }
  }, []);

  return (
    <View className="custom-tab-bar">
      {tabsInfo.map((item, index) => {
        const isSelected = selected === index;
        return (
          <View
            key={index}
            className={`tab-item ${isSelected ? "selected" : ""}`}
            onClick={() => switchTab(index)}
          >
            {isSelected ? item.selectedIcon : item.icon}
            <Text className={`tab-text ${isSelected ? "selected-text" : ""}`}>
              {item.text}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default observer(CustomTabBar);
