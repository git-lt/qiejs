/**
 * 暂停执行 多少毫秒
 * @param ms 毫秒
 */
function sleep(ms: NumberConstructor): Promise<Object> {
  return new Promise(r => setTimeout(r, ~~ms));
}

export default {
  sleep
};
