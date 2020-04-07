/* eslint-disable */
const logger = require('../lib/util/logger');

logger.done;
describe('测试工具类 logger.js', () => {
  test('logger.info', () => {
    const a = logger.info('log');
    expect(a).toBe(undefined);
  });
  test('logger.error', () => {
    const a = logger.error('log');
    expect(a).toBe(undefined);
  });
  test('logger.log', () => {
    const a = logger.log('log');
    expect(a).toBe(undefined);
  });
  test('logger.done', () => {
    const a = logger.done('success');
    expect(a).toBe(undefined);
  });
  test('logger.warn', () => {
    const a = logger.warn('warn');
    expect(a).toBe(undefined);
  });
  test('logger.clearConsole', () => {
    const a = logger.clearConsole('清空');
    expect(a).toBe(undefined);
  });
});
