// 数字计算
import {plus, minus, divide, times, calcArr} from "@mxssfd/ts-utils";

export type CalcType = "+" | "-" | "*" | "/" | "%" | "**"
type NUM = number | Calc;

// 链式计算
export default class Calc {
    private _value: number;

    public constructor(private readonly initNumber: number) {
        this.setValue(initNumber);
        if (typeof Symbol !== "undefined") {
            this[Symbol.toPrimitive] = () => this.value;
        }
    }

    // 初始化一个实例
    public static init(num: number): Calc {
        return new Calc(num);
    }

    public static template(template: string): Calc {
        // 数字
        const regNum = " ?-?\\d?\\.?\\d+ ?";
        // 乘除余
        const regCCY = "*\/%";
        // 幂
        const regPow = "\\*\\*";
        // 加减
        const regJJ = "+\\-";
        const ins = new Calc(0);

        function calc(search: string, label: CalcType): string {
            // console.log("s:", search, "label:", label);
            const arr = search.split(label).map(i => Number(i));
            return String(ins.setValue(arr[0])[label](arr[1]).value);
        }

        const regList = [
            // 是否有幂
            new RegExp(`(${regNum}(${regPow})${regNum})+`),
            // 是否有乘除余
            new RegExp(`(${regNum}(${regPow}|[${regCCY}])${regNum})+`),
            // 是否有加减
            new RegExp(`(${regNum}([${regJJ}])${regNum})+`),
        ];
        // 是否有括号
        let reg = new RegExp(`\\((${regNum}((${regPow}|[${regCCY + regJJ}])${regNum})+)\\)`);

        function foreach(s: string): string {
            let result = s;
            while (reg.test(result)) {
                const search = RegExp.$1;
                const value = String(foreach(search));
                result = result.replace(reg, value);
            }

            regList.forEach(regItem => {
                while (regItem.test(result)) {
                    const search = RegExp.$1;
                    const label = RegExp.$2 as CalcType;
                    result = result.replace(regItem, calc(search, label));
                }
            });
            return result;
        }

        return new Calc(Number(foreach(template)));
    }

    public static plus = plus;
    public static minus = minus;
    public static times = times;
    public static divide = divide;

    // *************运算*************
    // 加
    public ["+"](...nums: Array<number | Calc>): Calc {
        this.setValue(Calc.plus(this._value, ...(nums as number[])));
        return this;
    }

    public plus = this["+"];

    // 减
    public ["-"](...nums: Array<number | Calc>): Calc {
        this.setValue(Calc.minus(this._value, ...(nums as number[])));
        return this;
    }

    public minus = this["-"];

    // 乘
    public ["*"](...nums: Array<number | Calc>): Calc {
        this.setValue(Calc.times(this._value, ...(nums as number[])));
        return this;
    }

    public times = this["*"];

    // 除
    public ["/"](...nums: Array<number | Calc>): Calc {
        this.setValue(Calc.divide(this._value, ...(nums as number[])));
        return this;
    }

    public divide = this["/"];

    // 余
    public ["%"](...nums: number[]): Calc {
        this.setValue(calcArr(this._value, nums, (a, b, pow) => a % b));
        return this;
    }

    public mod = this["%"];

    // 幂
    public ["**"](pow: NUM = 2): Calc {
        this.setValue(Math.pow(this._value, pow.valueOf()));
        return this;
    }

    public pow = this["**"];

    // 100 - 20 * 2; <==>  Calc.init(20)["*"](2).by(100, "-")
    public by(num: NUM, calcLabel: CalcType): Calc {
        const value = this._value;
        this.setValue(num.valueOf());
        this[calcLabel](value);
        return this;
    }

    // *************运算*************

    // *************比较*************
    // 小于
    public ["<"](value: NUM): boolean {
        return this.value < value.valueOf();
    }

    public toBeLessThan = this["<"];

    // 小于等于
    public ["<="](value: NUM): boolean {
        return this.value <= value.valueOf();
    }

    public toBeLessThanOrEqual = this["<="];

    // 大于
    public [">"](value: NUM): boolean {
        return this.value > value.valueOf();
    }

    public toBeGreaterThan = this[">"];

    // 大于
    public [">="](value: NUM): boolean {
        return this.value >= value.valueOf();
    }

    public toBeGreaterThanOrEqual = this[">="];

    // 等于
    public ["="](value: NUM): boolean {
        return this.value === value.valueOf();
    }

    public toBeEqual = this["="];

    public isNaN(): boolean {
        const value = this.value;
        return value !== value;
    }

    // 是否在范围内，相当于min <= value <= max
    public in(min: NUM, max: NUM): boolean {
        min = min.valueOf();
        max = max.valueOf();
        const value = this.value;
        return min <= value && value <= max;
    }

    // *************比较*************

    // 绝对值
    public abs(): Calc {
        const value = this.value;
        if (value < 0) {
            this.setValue(value * -1);
        }
        return this;
    }

    // toInt
    public toInt() {
        this.setValue(~~this.value);
        return this;
    }

    public floor() {
        this.setValue(Math.floor(this.value));
        return this;
    }

    public round() {
        this.setValue(Math.round(this.value));
        return this;
    }

    // 重置为初始值
    public reset(): Calc {
        this._value = this.initNumber;
        return this;
    }

    // 设置值
    private setValue(value: NUM): Calc {
        this._value = value.valueOf();
        return this;
    }

    // 设置值
    public set value(num) {
        this.setValue(num);
    }

    // 获取结果值
    public get value(): number {
        // return strip(this._value);
        return this._value;
    }

    public valueOf(): number {
        return this.value;
    }

    public toString(): string {
        return String(this.value);
    }

    /* [Symbol.toString](hint: any): number {
         return this.value;
     }*/
}