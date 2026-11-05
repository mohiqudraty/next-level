//* Polymorism: different employees respond differently to the same method call.
class Employee {
    name;
    _baseSalary;
    constructor(name, _baseSalary) {
        this.name = name;
        this._baseSalary = _baseSalary;
    }
    get baseSalary() {
        return this._baseSalary;
    }
    set baseSalary(newSalary) {
        if (newSalary < 0)
            throw new Error("You Cannot set nagetive value");
        this._baseSalary = newSalary;
    }
    calculatePay(taxRate) {
        return this.baseSalary - this.baseSalary * taxRate;
    }
}
class Manager extends Employee {
    calculatePay() {
        return this.baseSalary + 111;
    }
}
class Developer extends Employee {
    type;
    constructor(name, _baseSalary, type) {
        super(name, _baseSalary);
        this.type = type;
    }
    calculatePay(taxRate) {
        return this.baseSalary + 500 - this.baseSalary * taxRate;
    }
}
const employee = new Employee("mohi", 5555);
const manager = new Manager("mahmud", 9999);
const developer = new Developer("qudraty", 7777, "full stak");
console.log(employee.calculatePay(0.1));
console.log(manager.calculatePay());
console.log(developer.calculatePay(0.1));
export {};
