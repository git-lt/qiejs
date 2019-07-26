/* eslint-disable */
import logger from "../dist/util/logger";

describe("测试工具类 logger.js", () => {
  test("logger.log", () => {
    const a = logger.log("log");
    expect(a).toBe(undefined);
  });
  test("logger.success", () => {
    const a = logger.success("success");
    expect(a).toBe(undefined);
  });
  test("logger.warn", () => {
    const a = logger.warn("warn");
    expect(a).toBe(undefined);
  });
});
