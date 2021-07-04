import Calc from "../src/index";

test("Calc", () => {
    // 0.1 + 0.2 = 0.30000000000000004
    expect(0.1 + 0.2).not.toBe(0.3);
    const c = new Calc(1);
    expect(Calc.init(0.1)["+"](0.2).value.toString()).toBe("0.3");

    // 0.3 - 0.1 = 0.19999999999999998
    expect(0.3 - 0.1).not.toBe(0.2);
    expect(Calc.init(0.3).minus(0.1).value).toBe(0.2);
    // 0.2 * 0.1 = 0.020000000000000004
    expect(0.2 * 0.1).not.toBe(0.02);
    expect(Calc.init(0.2).times(0.1).value).toBe(0.02);
    // 0.3 / 0.1 = 2.9999999999999996
    expect(0.3 / 0.1).not.toBe(3);
    expect(Calc.init(0.3).divide(0.1).value).toBe(3);

    // 100 / 10 + 5 - 2 = 13
    expect(c.times(100).divide(10).plus(5).minus(2).value).toBe(13);

    // 0.3 - 0.1 = 0.19999999999999998
    expect(0.3 - 0.1).not.toBe(0.2);
    expect(Calc.init(0.3)["-"](0.1).value).toBe(0.2);
    // 0.2 * 0.1 = 0.020000000000000004
    expect(0.2 * 0.1).not.toBe(0.02);
    expect(Calc.init(0.2)["*"](0.1).value).toBe(0.02);
    // 0.3 / 0.1 = 2.9999999999999996
    expect(0.3 / 0.1).not.toBe(3);
    expect(Calc.init(0.3)["/"](0.1).value).toBe(3);

    c.reset();
    // 100 / 10 + 5 - 2 = 13
    expect(c["*"](100)["/"](10)["+"](5)["-"](2).value).toBe(13);
    c.value = 0.1;
    // 0.1 + 0.2 - 0.1 = 0.2
    expect(c["+"](0.2)["-"](0.1).value).toBe(0.2);

    //  100 - 20 * 2 = 60
    expect(Calc.init(20)["*"](2).by(100, "-").value).toBe(60);

    // 参数测试
    // 100 - 10 - 20 - 30 - 100 = -60
    expect(Calc.init(100)["-"](Calc.init(50), Calc.init(50)).value).toBe(0);
    expect(Calc.init(100)["-"](Calc.init(50), Calc.init(50)).value).toBe(0);
    expect(Calc.init(100)["-"](Calc.init(50), Calc.init(50)).value).toBe(0);
    expect(Calc.init(100)["-"](Calc.init(50), Calc.init(50), Calc.init(50)).value).toBe(-50);
    expect(Calc.init(100)["-"](10, 20, 30, 100).value).toBe(-60);
    expect(Calc.init(100)["-"](10, 20, 30, 100).value).toBe(-60);
    expect(Calc.init(100)["-"](10, 20, 30, 100).value).toBe(-60);
    expect(Calc.init(100)["-"](10, 20, 30, 100).value).toBe(-60);

    expect(Calc.init(100)["+"](Calc.init(50), Calc.init(50)).value).toBe(200);
    expect(Calc.init(100)["+"](Calc.init(50), Calc.init(50)).value).toBe(200);
    expect(Calc.init(100)["+"](Calc.init(50), Calc.init(50)).value).toBe(200);
    expect(Calc.init(100)["+"](Calc.init(50), Calc.init(50), Calc.init(50)).value).toBe(250);
    expect(Calc.init(100)["+"](10, 20, 30, 100).value).toBe(260);
    expect(Calc.init(100)["+"](10, 20, 30, 100).value).toBe(260);
    expect(Calc.init(100)["+"](10, 20, 30, 100).value).toBe(260);
    expect(Calc.init(100)["+"](10, 20, 30, 100).value).toBe(260);

    expect(Calc.init(100)["*"](Calc.init(50), Calc.init(2)).value).toBe(10000);
    expect(Calc.init(100)["*"](Calc.init(50), Calc.init(2)).value).toBe(10000);
    expect(Calc.init(100)["*"](Calc.init(50), Calc.init(2)).value).toBe(10000);
    expect(Calc.init(100)["*"](Calc.init(50), Calc.init(2), Calc.init(5)).value).toBe(50000);
    expect(Calc.init(100)["*"](1, 2, 3, 10).value).toBe(6000);
    expect(Calc.init(100)["*"](1, 2, 3, 10).value).toBe(6000);
    expect(Calc.init(100)["*"](1, 2, 3, 10).value).toBe(6000);
    expect(Calc.init(100)["*"](1, 2, 3, 10).value).toBe(6000);

    const result = 2.5;
    expect(Calc.init(100)["/"](Calc.init(50), Calc.init(2)).value).toBe(1);
    expect(Calc.init(100)["/"](Calc.init(50), Calc.init(2)).value).toBe(1);
    expect(Calc.init(100)["/"](Calc.init(50), Calc.init(2)).value).toBe(1);
    expect(Calc.init(100)["/"](Calc.init(50), Calc.init(2), Calc.init(0.5)).value).toBe(2);
    expect(Calc.init(100)["/"](1, 2, 2, 10).value).toBe(result);
    expect(Calc.init(100)["/"](1, 2, 2, 10).value).toBe(result);
    expect(Calc.init(100)["/"](1, 2, 2, 10).value).toBe(result);
    expect(Calc.init(100)["/"](1, 2, 2, 10).value).toBe(result);

    expect(Calc.init(100).pow(1).value).toBe(100);
    expect(Calc.init(100)["**"](Calc.init(1)).value).toBe(100);
    expect(Calc.init(100)["**"](1).value).toBe(100);
    expect(Calc.init(100)["**"](2).value).toBe(100 ** 2);

    expect(Calc.init(100).in(Calc.init(1), 200)).toBeTruthy();
    expect(Calc.init(100).in(1, Calc.init(200))).toBeTruthy();
    expect(Calc.init(100).in(Calc.init(1), Calc.init(200))).toBeTruthy();
    expect(Calc.init(100).in(1, 200)).toBeTruthy();
    expect(Calc.init(1).in(1, 200)).toBeTruthy();
    expect(Calc.init(200).in(1, 200)).toBeTruthy();
    expect(Calc.init(200).in(1, 100)).toBe(false);
    expect(Calc.init(99).in(100, 200)).toBe(false);

    expect(Calc.init(100).toBeGreaterThan(1)).toBeTruthy();
    expect(Calc.init(100)[">"](Calc.init(1))).toBeTruthy();
    expect(Calc.init(100)[">"](1)).toBeTruthy();
    expect(Calc.init(100)[">"](100)).toBeFalsy();
    expect(Calc.init(100)[">"](Infinity)).toBeFalsy();
    expect(Calc.init(100)[">"](-Infinity)).toBeTruthy();

    expect(Calc.init(100).toBeGreaterThanOrEqual(1)).toBeTruthy();
    expect(Calc.init(100)[">="](Calc.init(1))).toBeTruthy();
    expect(Calc.init(100)[">="](1)).toBeTruthy();
    expect(Calc.init(100)[">="](100)).toBeTruthy();

    expect(Calc.init(1).toBeLessThan(2)).toBeTruthy();
    expect(Calc.init(1)["<"](Calc.init(2))).toBeTruthy();
    expect(Calc.init(1)["<"](2)).toBeTruthy();
    expect(Calc.init(1)["<"](-100)).toBeFalsy();
    expect(Calc.init(1)["<"](1)).toBeFalsy();

    expect(Calc.init(1).toBeLessThanOrEqual(2)).toBeTruthy();
    expect(Calc.init(1)["<="](Calc.init(2))).toBeTruthy();
    expect(Calc.init(1)["<="](2)).toBeTruthy();
    expect(Calc.init(1)["<="](1)).toBeTruthy();
    expect(Calc.init(1)["<="](-100)).toBeFalsy();

    expect(Calc.init(1).toBeEqual(1)).toBeTruthy();
    expect(Calc.init(1)["="](Calc.init(1))).toBeTruthy();
    expect(Calc.init(1)["="](1)).toBeTruthy();
    expect(Calc.init(1)["="](2)).toBeFalsy();

    expect(Calc.init(1.001).toInt().value).toBe(1);

    expect(Calc.init(1).abs().value).toBe(1);
    expect(Calc.init(-1).abs().value).toBe(1);

    expect(Calc.init(100.3).floor().value).toBe(Math.floor(100.3));

    expect(Calc.init(100.5).round().value).toBe(Math.round(100.5));
});
test("Calc 2", () => {
    const c = Calc.init(10)["/"](2)["+"](1);
    expect(Calc.init(100)["+"](c.reset()).by(10, "-").value).toBe(-100);
    expect(Calc.init(100)["-"](c).value).toBe(90);
    expect(Calc.init(100)["*"](c).by(10, "-").value).toBe(-990);
    expect(new Calc(100)["/"](c).by(10, "-").value).toBe(0);

    expect(20000000000.222222222.toString()).not.toBe("20000000000.222222222");
    expect(20000000000.222222222.toFixed(9)).toBe("20000000000.222221375");
    // expect(new Calc(10000000000.111111111)["+"](10000000000.111111111).toString()).toBe("20000000000.222222222");
    // 涉及位数长的数字计算还是不够准确，会省略掉一部分
    expect(new Calc(10000000000.111111111)["+"](10000000000.111111111).toString()).toBe("20000000000.22222");
});
test("Calc operate calc", () => {
    const num = new Calc(10);
    expect((num as any) + 100).toBe(110);

    // const origin = num[Symbol.toPrimitive];
    // 1.toPrimitive存在时优先使用toPrimitive
    num[Symbol.toPrimitive] = function () {
        return 0;
    };
    expect((num as any) + 100).toBe(100);

    // 2.toPrimitive不存在时使用valueOf
    num[Symbol.toPrimitive] = undefined;
    expect((num as any) + 100).toBe(110);
    num.valueOf = () => -10;
    expect((num as any) + 100).toBe(90);

    // 3.valueOf不存在时使用toString
    // @ts-ignore
    num["valueOf"] = undefined;
    num.reset();
    expect((num as any) + 100).toBe("10100");
    num.toString = () => "";
    expect((num as any) + 100).toBe("100");

    // 4.toString都不存在时，会报错
    // @ts-ignore
    num["toString"] = undefined;
    num.reset();
    expect(() => {
        return (num as any) + 100;
    }).toThrow();
});
test("plus", () => {
    expect(10000000000.111111111 + 10000000000.111111111).toBe(20000000000.222222222);
    expect((10000000000.111111111 + 10000000000.111111111).toString()).not.toBe("20000000000.222222222");
    expect(Calc.plus(10000000000.111111111, 10000000000.111111111)).toBe(20000000000.222222222);
    expect(Calc.plus(10000000000.111111111, 10000000000.111111111).toString()).toBe("20000000000.22222");
});
test("template", () => {
    console.time("test");
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
    expect(Calc.template("0.2 * (( 1 + 3) * (10 - 5))").value).toBe(4);

    expect(Calc.template("0.1 + 0.2").value).toBe(0.3);
    expect(Calc.template("0.1 + 0. 2").value).toBe(NaN);

    expect(Calc.template("0.1 += 0. 2").value).toBe(NaN);
    expect(Calc.template("0.1 += 0. 2").isNaN()).toBe(true);
    expect(Calc.template("0.1 + 0.2").isNaN()).toBe(false);

    expect(Calc.template("1 + 2 * 6 ** 2").value).toBe(73);

    console.timeEnd("test");
});

