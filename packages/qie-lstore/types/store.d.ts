import { ILocalStorage } from "./util";
declare class Store {
    storage: ILocalStorage;
    constructor();
    set(key: string, val: any): this;
    get(key: string): any;
    clear(): this;
    remove(key: string): any;
}
export default Store;
