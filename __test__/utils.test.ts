import * as utils from "../src/utils"

test("strip", () => {
    expect(utils.strip(1.0000000000041083)).toBe(1);
    expect(utils.strip(1.0000000000001563)).toBe(1);
});
test('getNumberLenAfterDot', () => {
    expect(utils.getNumberLenAfterDot(0.12345667)).toBe(8);
    expect(utils.getNumberLenAfterDot("0.123456789")).toBe(9);
    expect(utils.getNumberLenAfterDot(12345)).toBe(0);
    expect(utils.getNumberLenAfterDot("abc")).toBe(0);
    expect(utils.getNumberLenAfterDot(1.123e5)).toBe(0);
    expect(utils.getNumberLenAfterDot(1.123e2)).toBe(1);
    expect(utils.getNumberLenAfterDot(1.123e+2)).toBe(1);
    expect(utils.getNumberLenAfterDot(1e+2)).toBe(0);
});
