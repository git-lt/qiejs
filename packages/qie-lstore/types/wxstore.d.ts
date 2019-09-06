declare class Store {
    storage: any;
    set(key: string, val: any): this;
    get(key: string): any;
    clear(): this;
    remove(key: string): any;
}
export default Store;
