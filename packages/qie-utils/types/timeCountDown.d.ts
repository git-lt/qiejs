export interface ITimeCountDown {
    ms: number;
    onTick: (data: ITimeCountTickData) => void;
    onFinshed: Function;
    interval?: number;
}
export interface ITimeCountTickData {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
export default class TimeCountDown {
    ms: number;
    timmer: number;
    onTick: Function;
    onFinshed: Function;
    interval: number;
    count: number;
    endTime: number;
    constructor(config: ITimeCountDown);
    start(): void;
    stop(): void;
}
