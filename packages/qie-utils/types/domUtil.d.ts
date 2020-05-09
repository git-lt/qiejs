export declare function raf(fn: FrameRequestCallback): number;
export declare function cancelRaf(id: number): void;
export declare function scrollTop(el: HTMLElement | Window, from: number, to: number, duration: number, endCallback: Function): void;
declare const _default: {
    scrollTop: typeof scrollTop;
    raf: typeof raf;
    cancelRaf: typeof cancelRaf;
};
export default _default;
