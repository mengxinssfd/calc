// 数字计算


function isArray(target: any): target is any[] {
    return Array.isArray(target);
}

/**
 * 把错误的数据转正  from number-precision
 * strip(0.09999999999999998)=0.1
 */
export function strip(num: number, precision = 12): number {
    return +parseFloat(num.toPrecision(precision));
}

// 获取小数点后面数字的长度  // 支持科学计数法from number-precision
export function getNumberLenAfterDot(num: number | string): number {
    Number(1000).toPrecision();
    const eSplit = String(num).split(/[eE]/);
    const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
    return len > 0 ? len : 0;
}

// (10.10, 1.00001) => 100000
function getPow(a: number, b: number): number {
    let aLen = getNumberLenAfterDot(a);
    let bLen = getNumberLenAfterDot(b);
    return Math.pow(10, Math.max(aLen, bLen));
}

type NUM = number | NumberCalc;
type NumOrNArr = NUM[] | NUM;

function getValue(value: NUM): number {
    return value instanceof NumberCalc ? value.value : value;
}

type CalcType = "+" | "-" | "*" | "/" | "%" | "**"
// const CalcTypeArr = ["+", "-", "*", "/", "%", "**"];

// 链式计算
export class NumberCalc {
    private _value: number;

    public constructor(private readonly initNumber: number) {
        this.setValue(initNumber);
    }

    private calcArr(num: NUM[], callback: (a: number, b: number, pow: number) => number) {
        num.forEach(b => {
            b = getValue(b);
            const a = this._value;
            let pow = getPow(a, b);
            this.setValue(callback(a, b, pow));
        });
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
    public static init(num: number): NumberCalc {
        return new NumberCalc(num);
    }

    public static template(template: string): NumberCalc {
        // 数字
        const regNum = " ?-?\\d?\\.?\\d+ ?";
        // 乘除余
        const regCCY = "*\/%";
        // 幂
        const regPow = "\\*\\*";
        // 加减
        const regJJ = "+\\-";
        const Calc = new NumberCalc(0);

        function calc(search: string, label: CalcType): string {
            // console.log("s:", search, "label:", label);
            const arr = search.split(label).map(i => Number(i));
            return String(Calc.setValue(arr[0])[label](arr[1]).value);
        }

        function foreach(s: string): string {
            let result = s;
            // 是否有括号
            let reg = new RegExp(`\\((${regNum}((${regPow}|[${regCCY + regJJ}])${regNum})+)\\)`);
            while (reg.test(result)) {
                const search = RegExp.$1;
                const value = String(foreach(search));
                result = result.replace(reg, value);
            }
            // 是否有乘除余幂
            reg = new RegExp(`(${regNum}(${regPow}|[${regCCY}])${regNum})+`);
            while (reg.test(result)) {
                const search = RegExp.$1;
                const label = RegExp.$2 as CalcType;
                result = result.replace(reg, calc(search, label));
            }
            // 是否有加减
            reg = new RegExp(`(${regNum}([${regJJ}])${regNum})+`);
            while (reg.test(result)) {
                const search = RegExp.$1;
                const label = RegExp.$2;
                result = result.replace(reg, calc(search, label as CalcType));
                // console.log("result", result);
            }
            return result;
        }

        return new NumberCalc(Number(foreach(template)));
    }

    // *************运算*************
    // 加
    public ["+"](value: NumOrNArr, ...others: NUM[]): NumberCalc {
        this.calc((a, b, pow) => (a * pow + b * pow) / pow, value, others);
        return this;
    }

    public plus = this["+"];

    // 减
    public ["-"](value: NumOrNArr, ...others: NUM[]): NumberCalc {
        this.calc(((a, b, pow) => (a * pow - b * pow) / pow), value, others);
        return this;
    }

    public minus = this["-"];

    // 乘
    public ["*"](value: NumOrNArr, ...others: NUM[]): NumberCalc {
        this.calc((a, b, pow) => pow * a * (b * pow) / (pow * pow), value, others);
        return this;
    }

    public times = this["*"];

    // 除
    public ["/"](value: NumOrNArr, ...others: NUM[]): NumberCalc {
        this.calc((a, b, pow) => a * pow / (b * pow), value, others);
        return this;
    }

    public divide = this["/"];

    // 余
    public ["%"](value: NumOrNArr, ...others: NUM[]): NumberCalc {
        this.calc((a, b, pow) => a % b, value, others);
        return this;
    }

    // 取余的英文不知道怎么说

    // 幂
    public ["**"](pow: NUM = 2): NumberCalc {
        pow = getValue(pow);
        this.calc((a, value, pow) => a ** value, pow);
        return this;
    }

    public pow = this["**"];


    // 100 - 20 * 2; <==>  Calc.init(20)["*"](2).by(100, "-")
    public by(num: NUM, calcLabel: CalcType): NumberCalc {
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
    public abs(): NumberCalc {
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
    public reset(): NumberCalc {
        this._value = this.initNumber;
        return this;
    }

    // 设置值
    private setValue(value: NUM): NumberCalc {
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

}