// 数字计算
import {getPow, isArray, strip, CalcType} from "./utils";

type NUM = number | Calc;
type NumOrNArr = NUM[] | NUM;

function getValue(value: NUM): number {
    return value instanceof Calc ? value.value : value;
}


// const CalcTypeArr = ["+", "-", "*", "/", "%", "**"];

// 链式计算
export default class Calc {
    private _value: number;

    public constructor(private readonly initNumber: number) {
        this.setValue(initNumber);
        if (typeof Symbol !== "undefined") {
            this[Symbol.toPrimitive] = () => this.value;
        }
    }

    private calcArr(num: NUM[], callback: (a: number, b: number, pow: number) => number) {
        num.forEach(b => {
            b = getValue(b);
            const a = this._value;
            let pow = getPow(a, b);
            this.setValue(callback(a, b, pow));
        });
    }

    public static plus(num: number | Calc, ...others: Array<number | Calc>) {
        return others.reduce((a, v) => {
            const b = v.valueOf();
            const pow = getPow(a, b);
            return (a * pow + b * pow) / pow;
        }, 0);
    }

    // 去除小数点
    private calc(callback: (currentValue: number, value: number, pow: number) => number, value: NumOrNArr, others?: NUM[]) {
        if (!isArray(value)) {
            value = getValue(value);
            const a = this._value;
            const b = value;
            const pow = getPow(a, b);
            this.setValue(callback(a, b, pow));
        } else {
            this.calcArr(value, callback);
        }
        if (others && others.length) {
            this.calcArr(others, callback);
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

    // *************运算*************
    // 加
    public ["+"](value: NumOrNArr, ...others: NUM[]): Calc {
        this.calc((a, b, pow) => (a * pow + b * pow) / pow, value, others);
        return this;
    }

    public plus = this["+"];

    // 减
    public ["-"](value: NumOrNArr, ...others: NUM[]): Calc {
        this.calc(((a, b, pow) => (a * pow - b * pow) / pow), value, others);
        return this;
    }

    public minus = this["-"];

    // 乘
    public ["*"](value: NumOrNArr, ...others: NUM[]): Calc {
        this.calc((a, b, pow) => pow * a * (b * pow) / (pow * pow), value, others);
        return this;
    }

    public times = this["*"];

    // 除
    public ["/"](value: NumOrNArr, ...others: NUM[]): Calc {
        this.calc((a, b, pow) => a * pow / (b * pow), value, others);
        return this;
    }

    public divide = this["/"];

    // 余
    public ["%"](value: NumOrNArr, ...others: NUM[]): Calc {
        this.calc((a, b, pow) => a % b, value, others);
        return this;
    }

    // 取余的英文不知道怎么说

    // 幂
    public ["**"](pow: NUM = 2): Calc {
        pow = getValue(pow);
        this.calc((a, value, pow) => a ** value, pow);
        return this;
    }

    public pow = this["**"];


    // 100 - 20 * 2; <==>  Calc.init(20)["*"](2).by(100, "-")
    public by(num: NUM, calcLabel: CalcType): Calc {
        num = getValue(num);
        const value = this._value;
        this.setValue(num);
        this[calcLabel](value);
        return this;
    }

    // *************运算*************

    // *************比较*************
    // 小于
    public ["<"](value: NUM): boolean {
        value = getValue(value);
        return this.value < value;
    }

    public toBeLessThan = this["<"];

    // 小于等于
    public ["<="](value: NUM): boolean {
        value = getValue(value);
        return this.value <= value;
    }

    public toBeLessThanOrEqual = this["<="];

    // 大于
    public [">"](value: NUM): boolean {
        value = getValue(value);
        return this.value > value;
    }

    public toBeGreaterThan = this[">"];

    // 大于
    public [">="](value: NUM): boolean {
        value = getValue(value);
        return this.value >= value;
    }

    public toBeGreaterThanOrEqual = this[">="];

    // 等于
    public ["="](value: NUM): boolean {
        value = getValue(value);
        return this.value === value;
    }

    public toBeEqual = this["="];

    public isNaN(): boolean {
        const value = this.value;
        return value !== value;
    }

    // 是否在范围内，相当于min <= value <= max
    public in(min: NUM, max: NUM): boolean {
        min = getValue(min);
        max = getValue(max);
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
        value = getValue(value);
        this._value = value;
        return this;
    }

    // 设置值
    public set value(num) {
        this.setValue(num);
    }

    // 获取结果值
    public get value(): number {
        return strip(this._value);
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