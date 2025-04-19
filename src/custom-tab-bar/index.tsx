import "./index.scss";

import {
  RecordsOutlined,
  UnderwayOutlined,
  UserOutlined,
} from "@taroify/icons";
import { Text, View } from "@tarojs/components";
import { useEffect, useState } from "react";

import Taro from "@tarojs/taro";
import globalStore from "@/store/global";
import { observer } from "mobx-react";

const tabsInfo = [
  {
    pagePath: "pages/index/index",
    text: "测试",
    icon: <RecordsOutlined color="#fff" />,
    selectedIcon: <RecordsOutlined color="#fff" />,
  },
  {
    pagePath: "pages/history/index",
    text: "历史评测",
    icon: <UnderwayOutlined color="#fff" />,
    selectedIcon: <UnderwayOutlined color="#fff" />,
  },
  {
    pagePath: "pages/profile/index",
    text: "我的",
    icon: <UserOutlined color="#fff" />,
    selectedIcon: <UserOutlined color="#fff" />,
  },
];

function CustomTabBar() {
  const [selected, setSelected] = useState(0);

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
