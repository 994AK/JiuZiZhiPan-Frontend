import "./app.scss";

import {
  useError,
  useLaunch,
} from "@tarojs/taro";

import { FC } from "react";
import { Provider } from "mobx-react";
import store from "./store";
import { SafeAreaProvider } from "./contexts/SafeAreaContext";

const App: FC = ({ children }) => {
  useLaunch(() => {
    console.log("App launched.");
  });

  useError((error) => {
    console.error("App error:", error);
  });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {children}
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
