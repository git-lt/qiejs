let hexBytes: string[] = [];
let crypt0: typeof window.crypto = null;
const BUFFER_SIZE = 4096;

for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 0x100).toString(16).substr(1);
}

if (typeof window.crypto !== "undefined") {
  crypt0 = window.crypto;
} else if (typeof module !== "undefined" && typeof require === "function") {
  crypt0 = require("crypto");
}

class Uuid {
  buf: number[] | Uint8Array;
  bufIdx: number;
  constructor() {
    this.buf = null;
    this.bufIdx = 0;
  }

  clear() {
    this.buf = null;
    this.bufIdx = 0;
  }

  test(uuid: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
  }

  _randomBytes(n: number): number[] | Uint8Array {
    if (crypt0.getRandomValues) {
      const bytes = new Uint8Array(n);
      crypt0.getRandomValues(bytes);
      return bytes;
    } else {
      let r = [];
      for (let i = 0; i < n; i++) {
        r.push(Math.floor(Math.random() * 256));
      }
      return r;
    }
  }

  _randomBytesBuffered(n: number) {
    let { buf, bufIdx } = this;
    if (!buf || bufIdx + n > BUFFER_SIZE) {
      bufIdx = 0;
      buf = this._randomBytes(BUFFER_SIZE);
    }
    return buf.slice(bufIdx, (bufIdx += n));
  }

  _uuidBin() {
    let b = this._randomBytesBuffered(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return b;
  }

  uuid(): string {
    const b = this._uuidBin();
    let res = "";
    for (let i = 0; i < 16; i++) {
      res += hexBytes[b[i]];
      if ([3, 5, 7, 9].indexOf(i) > -1) res += "-";
    }
    return res.toUpperCase();
  }
}

export default new Uuid();
