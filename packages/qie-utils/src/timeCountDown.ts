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

const noop = () => {};

class TimeCountDown {
  ms: number;
  timmer: number;
  onTick: Function;
  onFinshed: Function;
  interval: number;
  count: number;
  endTime: number;
  constructor(config: ITimeCountDown) {
    const { ms, onTick, interval, onFinshed } = config;
    this.ms = ms;
    this.onTick = onTick || noop;
    this.onFinshed = onFinshed || noop;
    this.interval = interval || 1000;
    this.timmer = null;
    this.count = 0;
    this.endTime = new Date().getTime();

    this.start();
  }
  start() {
    this.count++;
    const offset =
      new Date().getTime() - (this.endTime + this.count * this.interval);
    let nextTime = this.interval - offset;
    if (nextTime < 0) {
      nextTime = 0;
    }
    this.ms -= this.interval;

    if (this.ms < 0) {
      window.clearTimeout(this.timmer);
      this.timmer = null;
      this.onFinshed();
    } else {
      const d = Math.floor(this.ms / (24 * 60 * 60 * 1000));
      const h = Math.floor(this.ms / (60 * 60 * 1000) - d * 24);
      const m = Math.floor(this.ms / (60 * 1000) - d * 24 * 60 - h * 60);
      const s = Math.floor((this.ms / 1000) % 60);
      this.onTick({
        days: d,
        hours: h,
        minutes: m,
        seconds: s,
        milliseconds: this.ms
      });
      this.timmer = window.setTimeout(() => this.start(), nextTime);
    }
  }

  stop() {
    window.clearTimeout(this.timmer);
    this.timmer = null;
  }
}

const timeCountDown = (config: ITimeCountDown) => new TimeCountDown(config);

export default timeCountDown;
