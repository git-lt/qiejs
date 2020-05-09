let prev = Date.now();
const root = (typeof window === 'undefined' ? global : window) as Window;

function fallback(fn: FrameRequestCallback): number {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

const iRaf = root.requestAnimationFrame || fallback;

const iCancel = root.cancelAnimationFrame || root.clearTimeout;

export function raf(fn: FrameRequestCallback): number {
  return iRaf.call(root, fn);
}

export function cancelRaf(id: number) {
  iCancel.call(root, id);
}

export function scrollTop(el: HTMLElement | Window, from = 0, to: number, duration = 500, endCallback: Function) {
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  const scroll = (start: number, end: number, step: number) => {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === root) {
      root.scrollTo(d, d);
    } else {
      (el as HTMLElement).scrollTop = d;
    }
    raf(() => scroll(d, end, step));
  };
  scroll(from, to, step);
}

export default {
  scrollTop,
  raf,
  cancelRaf,
};
