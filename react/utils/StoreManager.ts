
interface StoreManagerInterface {
    store: any
    key: string
    getItem: (arg: string) => void
}


export default class StoreManager implements StoreManagerInterface {
    store: any = null
    key: string = ''

    constructor(key: string, store?: any) {
        this.store = store || window.localStorage
        this.key = key
    }

    getItem = (key?: string) => {
        let _key = key || this.key
        return this.store.getItem(_key)
    }

    setItem = (data: any, key?: string) => {
        let _key = key || this.key
        let _data = typeof (data) == 'string' ? data : JSON.stringify(data)
        return this.store.setItem(_key, _data)
    }

    removeItem = (key?: string) => {
        let _key = key || this.key
        this.store.removeItem(_key)
    }
}