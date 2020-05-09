declare type TimeData = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
interface CountDownOption {
    time: number;
    format?: string;
    autoStart?: boolean;
    millisecond?: boolean;
    onFinish(): void;
    onChange(res: string, timeData: TimeData): void;
}
declare class CountDown {
    time: CountDownOption['time'];
    format: CountDownOption['format'];
    autoStart: CountDownOption['autoStart'];
    millisecond: CountDownOption['millisecond'];
    onFinish: CountDownOption['onFinish'];
    onChange: CountDownOption['onChange'];
    timeData: TimeData;
    formattedTime: string;
    isCounting: boolean;
    endTime: number;
    remain: number;
    rafId: number;
    constructor(options: CountDownOption);
    start: () => void;
    pause(): void;
    reset(): void;
    tick(): void;
    microTick(): void;
    macroTick(): void;
    getRemain(): number;
    setRemain(remain: number): void;
}
export default CountDown;
