import storeContext from "../store";
import { useContext } from "react";

const useStore = () => {
    const store = useContext(storeContext);
    if (!store) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return store;
};
    

export default useStore;
