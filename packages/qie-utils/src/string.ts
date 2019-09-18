/**
 * 根据位置,使用 * 遮蔽字符串
 * @param {string} cc
 * @param {number} num1
 * @param {number} num2
 * @param {string} _mask
 * @example utilscore.mask('12398765432',3,7) // => "123****5432"
 */

export const numberMask = (cc: string, num1 = 0, num2 = 0, _mask = "*") => {
  let reg = new RegExp(
    `\^\(\.\{${num1}\}\)\(\.\{${num2 - num1}\}\)\(\.${
      num2 >= cc.length ? "?" : "+"
    }\)\$`
  );
  return cc.replace(
    reg,
    (_$0, $1, $2, $3) => $1 + $2.replace(/./g, _mask) + $3
  );
};

/**
 * 生成一个随机的十六进制颜色代码
 * @example utilscore.randomHexColorCode() // => "#c4aabc"
 */
export const randomHexColorCode = (): string => {
  let n = ((Math.random() * 0xfffff) | 0).toString(16);
  return (
    "#" + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n)
  );
};

/**
 * 全局唯一标识符 UUID
 * @param {number} len 长度
 * @param {number} radix 基数 62
 * @example utilscore.uuid(10,62) // => "e424F79HP8"
 */
export const uuid = (len: number, radix?: number) => {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
};

export function getStrLen(str: string): number {
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length / 2;
}

export function getFileSuffix(fileName: string): string {
  const pos = fileName.lastIndexOf(".");
  return pos > -1 ? fileName.substring(pos) : "";
}

export function getNameById(list: any[], id: number | string): string {
  for (let i = 0; i < list.length; i++) {
    if (list[i] && list[i]["id"] === id) return list[i].name;
  }
  return "";
}
