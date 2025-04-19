import { observable } from 'mobx'

const globalStore = observable({
    currentTab: 0,
    setCurrentTab: (index: number) => {
        globalStore.currentTab = index;
    }
})

export default globalStore
