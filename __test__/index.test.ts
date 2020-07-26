import * as numCalc from "../src/index";

test("strip", () => {
    expect(numCalc.strip(1.0000000000041083)).toBe(1);
    expect(numCalc.strip(1.0000000000001563)).toBe(1);
});
test('getNumberLenAfterDot', () => {
    expect(numCalc.getNumberLenAfterDot(0.12345667)).toBe(8);
    expect(numCalc.getNumberLenAfterDot("0.123456789")).toBe(9);
    expect(numCalc.getNumberLenAfterDot(12345)).toBe(0);
    expect(numCalc.getNumberLenAfterDot("abc")).toBe(0);
    expect(numCalc.getNumberLenAfterDot(1.123e5)).toBe(0);
    expect(numCalc.getNumberLenAfterDot(1.123e2)).toBe(1);
    expect(numCalc.getNumberLenAfterDot(1.123e+2)).toBe(1);
    expect(numCalc.getNumberLenAfterDot(1e+2)).toBe(0);
});

test('Calc', () => {
    const Num = numCalc.NumberCalc;
    // 0.1 + 0.2 = 0.30000000000000004
    expect(0.1 + 0.2).not.toBe(0.3);
    const c = new Num(1);

    // 0.3 - 0.1 = 0.19999999999999998
    expect(0.3 - 0.1).not.toBe(0.2);
    expect(Num.init(0.3).minus(0.1).value).toBe(0.2);
    // 0.2 * 0.1 = 0.020000000000000004
    expect(0.2 * 0.1).not.toBe(0.02);
    expect(Num.init(0.2).times(0.1).value).toBe(0.02);
    // 0.3 / 0.1 = 2.9999999999999996
    expect(0.3 / 0.1).not.toBe(3);
    expect(Num.init(0.3).divide(0.1).value).toBe(3);

    // 100 / 10 + 5 - 2 = 13
    expect(c.times(100).divide(10).plus(5).minus(2).value).toBe(13);

    // 0.3 - 0.1 = 0.19999999999999998
    expect(0.3 - 0.1).not.toBe(0.2);
    expect(Num.init(0.3)["-"](0.1).value).toBe(0.2);
    // 0.2 * 0.1 = 0.020000000000000004
    expect(0.2 * 0.1).not.toBe(0.02);
    expect(Num.init(0.2)["*"](0.1).value).toBe(0.02);
    // 0.3 / 0.1 = 2.9999999999999996
    expect(0.3 / 0.1).not.toBe(3);
    expect(Num.init(0.3)["/"](0.1).value).toBe(3);

    c.reset();
    // 100 / 10 + 5 - 2 = 13
    expect(c["*"](100)["/"](10)["+"](5)["-"](2).value).toBe(13);
    c.value = 0.1;
    // 0.1 + 0.2 - 0.1 = 0.2
    expect(c["+"](0.2)["-"](0.1).value).toBe(0.2);


    //  100 - 20 * 2 = 60
    expect(Num.init(20)["*"](2).by(100, "-").value).toBe(60);

    // 参数测试
    // 100 - 10 - 20 - 30 - 100 = -60
    expect(Num.init(100)["-"]([Num.init(50), Num.init(50)]).value).toBe(0);
    expect(Num.init(100)["-"](Num.init(50), Num.init(50)).value).toBe(0);
    expect(Num.init(100)["-"]([Num.init(50)], Num.init(50)).value).toBe(0);
    expect(Num.init(100)["-"]([Num.init(50), Num.init(50)], Num.init(50)).value).toBe(-50);
    expect(Num.init(100)["-"]([10, 20, 30, 100]).value).toBe(-60);
    expect(Num.init(100)["-"](10, 20, 30, 100).value).toBe(-60);
    expect(Num.init(100)["-"]([10, 20], 30, 100).value).toBe(-60);
    expect(Num.init(100)["-"]([10, 20, 30], 100).value).toBe(-60);

    expect(Num.init(100)["+"]([Num.init(50), Num.init(50)]).value).toBe(200);
    expect(Num.init(100)["+"](Num.init(50), Num.init(50)).value).toBe(200);
    expect(Num.init(100)["+"]([Num.init(50)], Num.init(50)).value).toBe(200);
    expect(Num.init(100)["+"]([Num.init(50), Num.init(50)], Num.init(50)).value).toBe(250);
    expect(Num.init(100)["+"]([10, 20, 30, 100]).value).toBe(260);
    expect(Num.init(100)["+"](10, 20, 30, 100).value).toBe(260);
    expect(Num.init(100)["+"]([10, 20], 30, 100).value).toBe(260);
    expect(Num.init(100)["+"]([10, 20, 30], 100).value).toBe(260);

    expect(Num.init(100)["*"]([Num.init(50), Num.init(2)]).value).toBe(10000);
    expect(Num.init(100)["*"](Num.init(50), Num.init(2)).value).toBe(10000);
    expect(Num.init(100)["*"]([Num.init(50)], Num.init(2)).value).toBe(10000);
    expect(Num.init(100)["*"]([Num.init(50), Num.init(2)], Num.init(5)).value).toBe(50000);
    expect(Num.init(100)["*"]([1, 2, 3, 10]).value).toBe(6000);
    expect(Num.init(100)["*"](1, 2, 3, 10).value).toBe(6000);
    expect(Num.init(100)["*"]([1, 2], 3, 10).value).toBe(6000);
    expect(Num.init(100)["*"]([1, 2, 3], 10).value).toBe(6000);

    const result = 2.5;
    expect(Num.init(100)["/"]([Num.init(50), Num.init(2)]).value).toBe(1);
    expect(Num.init(100)["/"](Num.init(50), Num.init(2)).value).toBe(1);
    expect(Num.init(100)["/"]([Num.init(50)], Num.init(2)).value).toBe(1);
    expect(Num.init(100)["/"]([Num.init(50), Num.init(2)], Num.init(0.5)).value).toBe(2);
    expect(Num.init(100)["/"]([1, 2, 2, 10]).value).toBe(result);
    expect(Num.init(100)["/"](1, 2, 2, 10).value).toBe(result);
    expect(Num.init(100)["/"]([1, 2], 2, 10).value).toBe(result);
    expect(Num.init(100)["/"]([1, 2, 2], 10).value).toBe(result);

    expect(Num.init(100).pow(1).value).toBe(100);
    expect(Num.init(100)["**"](Num.init(1)).value).toBe(100);
    expect(Num.init(100)["**"](1).value).toBe(100);
    expect(Num.init(100)["**"](2).value).toBe(100 ** 2);

    expect(Num.init(100).in(Num.init(1), 200)).toBeTruthy();
    expect(Num.init(100).in(1, Num.init(200))).toBeTruthy();
    expect(Num.init(100).in(Num.init(1), Num.init(200))).toBeTruthy();
    expect(Num.init(100).in(1, 200)).toBeTruthy();
    expect(Num.init(1).in(1, 200)).toBeTruthy();
    expect(Num.init(200).in(1, 200)).toBeTruthy();
    expect(Num.init(200).in(1, 100)).toBe(false);
    expect(Num.init(99).in(100, 200)).toBe(false);

    expect(Num.init(100).toBeGreaterThan(1)).toBeTruthy();
    expect(Num.init(100)[">"](Num.init(1))).toBeTruthy();
    expect(Num.init(100)[">"](1)).toBeTruthy();
    expect(Num.init(100)[">"](100)).toBeFalsy();
    expect(Num.init(100)[">"](Infinity)).toBeFalsy();
    expect(Num.init(100)[">"](-Infinity)).toBeTruthy();

    expect(Num.init(100).toBeGreaterThanOrEqual(1)).toBeTruthy();
    expect(Num.init(100)[">="](Num.init(1))).toBeTruthy();
    expect(Num.init(100)[">="](1)).toBeTruthy();
    expect(Num.init(100)[">="](100)).toBeTruthy();

    expect(Num.init(1).toBeLessThan(2)).toBeTruthy();
    expect(Num.init(1)["<"](Num.init(2))).toBeTruthy();
    expect(Num.init(1)["<"](2)).toBeTruthy();
    expect(Num.init(1)["<"](-100)).toBeFalsy();
    expect(Num.init(1)["<"](1)).toBeFalsy();

    expect(Num.init(1).toBeLessThanOrEqual(2)).toBeTruthy();
    expect(Num.init(1)["<="](Num.init(2))).toBeTruthy();
    expect(Num.init(1)["<="](2)).toBeTruthy();
    expect(Num.init(1)["<="](1)).toBeTruthy();
    expect(Num.init(1)["<="](-100)).toBeFalsy();

    expect(Num.init(1).toBeEqual(1)).toBeTruthy();
    expect(Num.init(1)["="](Num.init(1))).toBeTruthy();
    expect(Num.init(1)["="](1)).toBeTruthy();
    expect(Num.init(1)["="](2)).toBeFalsy();

    expect(Num.init(1.001).toInt().value).toBe(1);

    expect(Num.init(1).abs().value).toBe(1);
    expect(Num.init(-1).abs().value).toBe(1);

    expect(Num.init(100.3).floor().value).toBe(Math.floor(100.3));

    expect(Num.init(100.5).round().value).toBe(Math.round(100.5));
});
test('Calc 2', () => {
    const Calc = numCalc.NumberCalc;
    const c = Calc.init(10)["/"](2)["+"](1);
    expect(Calc.init(100)["+"](c.reset()).by(10, "-").value).toBe(-100);
    expect(Calc.init(100)["-"](c).value).toBe(90);
    expect(Calc.init(100)["*"](c).by(10, "-").value).toBe(-990);
    expect(new Calc(100)["/"](c).by(10, "-").value).toBe(0);
});
test('template', () => {
    const Calc = numCalc.NumberCalc;

    // +
    expect(Calc.template("100+200").value).toBe(300);
    expect(Calc.template("100+200+300").value).toBe(600);

    // -
    expect(Calc.template("100-20").value).toBe(80);
    expect(Calc.template("100-20-30").value).toBe(50);

    // + -
    expect(Calc.template("100-20+30").value).toBe(110);
    expect(Calc.template("100+20-30").value).toBe(90);

    // *
    expect(Calc.template("100*2").value).toBe(200);
    expect(Calc.template("100*2*3").value).toBe(600);

    // /
    expect(Calc.template("100/2").value).toBe(50);
    expect(Calc.template("100/2/2").value).toBe(25);

    // * /
    expect(Calc.template("100*2/50").value).toBe(4);

    // %
    expect(Calc.template("11%10").value).toBe(1);

    // **
    expect(Calc.template("10**2").value).toBe(100);

    // ()
    expect(Calc.template("2*(1+3)").value).toBe(8);
    expect(Calc.template("2*(1+3*4)").value).toBe(26);
    expect(Calc.template("2*((1+3)*4)").value).toBe(32);
    expect(Calc.template("2*((1+3)%10)").value).toBe(8);
    expect(Calc.template("2*((1+3)**2)").value).toBe(32);
    expect(Calc.template("0.2*((1+3)**2)").value).toBe(3.2);
    expect(Calc.template("0.2 * (( 1 + 3) ** 2)").value).toBe(3.2);

    expect(Calc.template("0.1 + 0.2").value).toBe(0.3);
    expect(Calc.template("0.1 + 0. 2").value).toBe(NaN);

    expect(Calc.template("0.1 += 0. 2").value).toBe(NaN);
    expect(Calc.template("0.1 += 0. 2").isNaN()).toBe(true);
    expect(Calc.template("0.1 + 0.2").isNaN()).toBe(false);
});

