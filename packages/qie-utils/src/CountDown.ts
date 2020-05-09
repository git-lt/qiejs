import { raf, cancelRaf } from './domUtil';

type TimeData = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * 数字补0
 * @param num 数字
 * @param targetLength 长度
 * @example padZero(2) -> '02'
 */
function padZero(num: number | string, targetLength = 2): string {
  let str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}

/**
 * 传入毫秒数，计算剩余 天时分秒数
 * @param time 毫秒数
 * @example parseTimeData(60*1000) -> {days, hours, minutes, seconds, milliseconds}
 */
function parseTimeData(time: number): TimeData {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

/**
 * 格式化为 天时分秒
 * @param format 例：DD:HH:mm:ss:SSS
 * @param timeData 天时分秒数据对象
 * @example parseFormat('DD 天 HH 时', {}) -> 01 天 04 时
 */
function parseFormat(format: string, timeData: TimeData): string {
  const { days } = timeData;
  let { hours, minutes, seconds, milliseconds } = timeData;

  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    format = format.replace('DD', padZero(days));
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', padZero(hours));
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', padZero(minutes));
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', padZero(seconds));
  }

  if (format.indexOf('S') !== -1) {
    const ms = padZero(milliseconds, 3);

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms);
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }

  return format;
}

/**
 * 判断两个毫秒数是否相等
 * @param time1 毫秒数1
 * @param time2 毫秒数1
 */
function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

interface CountDownOption {
  // 剩余时长毫秒数
  time: number;
  // 时间格式 天：小时：分：秒 DD:HH:mm:ss:SSS
  format?: string;
  // 是否自动开始倒计时
  autoStart?: boolean;
  // 是否开启毫秒级更新
  millisecond?: boolean;
  // 结束回调
  onFinish(): void;
  // 更新回调
  onChange(res: string, timeData: TimeData): void;
}

class CountDown {
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

  constructor(options: CountDownOption) {
    const { time, format, autoStart, millisecond, onFinish, onChange } = options;

    this.time = time || 0;
    this.format = format || 'HH:mm:ss';
    this.autoStart = autoStart !== false;
    this.millisecond = !!millisecond;
    this.onFinish = onFinish;
    this.onChange = onChange;

    this.remain = 0;
    this.endTime = 0;
    this.isCounting = false;

    this.autoStart && this.start();
  }
  // 开始
  start = () => {
    if (this.isCounting) return;

    this.isCounting = true;
    this.endTime = Date.now() + this.time;
    this.tick();
  };
  // 停止
  pause() {
    this.isCounting = false;
    cancelRaf(this.rafId);
  }

  // 重置
  reset() {
    this.pause();

    this.remain = +this.time;
    this.autoStart && this.start();
  }
  // 更新
  tick() {
    this.millisecond ? this.microTick() : this.macroTick();
  }
  // 毫秒级的更新
  microTick() {
    this.rafId = raf(() => {
      if (!this.isCounting) return;

      const remain = this.getRemain();
      this.setRemain(remain);

      this.remain > 0 && this.microTick();
    });
  }
  // 秒级更新
  macroTick() {
    this.rafId = raf(() => {
      if (!this.isCounting) return;

      const remain = this.getRemain();

      if (!isSameSecond(remain, this.remain) || remain === 0) {
        this.setRemain(remain);
      }

      if (this.remain > 0) {
        this.macroTick();
      }
    });
  }
  // 获取剩余的毫秒
  getRemain() {
    return Math.max(this.endTime - Date.now(), 0);
  }
  // 设置剩余的毫秒
  setRemain(remain: number) {
    this.remain = remain;
    this.timeData = parseTimeData(this.remain);
    this.formattedTime = parseFormat(this.format, this.timeData);

    // 触发更新回调
    this.onChange(this.formattedTime, this.timeData);

    if (remain === 0) {
      this.pause();
      // 触发结束
      this.onFinish();
    }
  }
}

export default CountDown;
