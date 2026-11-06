class Employee {
  name: string;
  baseSalary: number;

  constructor(name: string, baseSalary: number) {
    this.name = name;
    this.baseSalary = baseSalary;
  }
}

const employee = new Employee("mohi", 453453);
const employee1 = new Employee("mahmud", 65435);

console.log(employee, employee1);
console.log(employee instanceof Employee);

