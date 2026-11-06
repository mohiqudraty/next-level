//* Polymorism: different employees respond differently to the same method call.

class Employee {
  constructor(
    public name: string,
    protected _baseSalary: number,
  ) {}

  get baseSalary(): number {
    return this._baseSalary;
  }

  set baseSalary(newSalary: number) {
    if (newSalary < 0) throw new Error("You Cannot set nagetive value");
    this._baseSalary = newSalary;
  }

  calculatePay(taxRate: number): number {
    return this.baseSalary - this.baseSalary * taxRate;
  }
}

class Manager extends Employee {
  override calculatePay(): number {
    return this.baseSalary + 111;
  }
}

class Developer extends Employee {
  constructor(
    name: string,
    _baseSalary: number,
    public type: string,
  ) {
    super(name, _baseSalary);
  }
  override calculatePay(taxRate: number): number {
    return this.baseSalary + 500 - this.baseSalary * taxRate;
  }
}

const employee = new Employee("mohi", 5555);
const manager = new Manager("mahmud", 9999);
const developer = new Developer("qudraty", 7777, "full stak");

console.log(employee.calculatePay(0.1));
console.log(manager.calculatePay());
console.log(developer.calculatePay(0.1));

