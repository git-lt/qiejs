declare class Uuid {
    buf: number[] | Uint8Array;
    bufIdx: number;
    constructor();
    clear(): void;
    test(uuid: string): boolean;
    _randomBytes(n: number): number[] | Uint8Array;
    _randomBytesBuffered(n: number): number[] | Uint8Array;
    _uuidBin(): number[] | Uint8Array;
    uuid(): string;
}
declare const _default: Uuid;
export default _default;
