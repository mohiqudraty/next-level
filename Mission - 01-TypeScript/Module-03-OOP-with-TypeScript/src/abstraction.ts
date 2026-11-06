//* Abstraction: every employee must define how their pay is calculated.

abstract class Employee {
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

  abstract calculatePay(): number;
}

class Manager extends Employee {
  calculatePay(): number {
    return this.baseSalary + 5000;
  }
}
class Developer extends Employee {
  calculatePay(): number {
    return this.baseSalary + 3000;
  }
}

