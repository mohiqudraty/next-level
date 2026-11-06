//* Encapsulation: protect a state and change it through methods.

//* Access Modifier
//? Public
//? Privet
//? Protected

//? Readonly

class Employee {
  constructor(
    public name: string,
    private _baseSalary: number,
  ) {}

  get baseSalary(): number {
    return this._baseSalary;
  }

  get salaryWithBonous(): number{
    return this._baseSalary + 5000;
  }

  set baseSalary(newSalary: number) {
    if(newSalary < 0) throw new Error("You Cannot set nagetive value")
    this._baseSalary = newSalary;
  }
}

const employee = new Employee("mohi", 1111111);
const employee1 = new Employee("mahmud", 222222);
employee.baseSalary = 5555;

console.log(employee, employee1);

console.log(employee.salaryWithBonous);

