import { createContext } from "react";
import globalStore from "./global";

const storeContext = createContext({
    globalStore,
}); 

export default storeContext;


