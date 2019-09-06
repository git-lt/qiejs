declare class LStore<T> {
    lstore: T;
    prefix: string;
    constructor(prefix: string);
    init: (keys: string[]) => T;
}
export default LStore;
