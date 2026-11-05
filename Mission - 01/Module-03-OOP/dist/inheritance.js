//* Inheritance: a manger is an employee with an additional responsiblity
//* Encapsulation: protect a state and change it through methods.
//* Access Modifier
//? Public
//? Privet
//? Protected
//? Readonly
class Employee {
    name;
    _baseSalary;
    constructor(name, _baseSalary) {
        this.name = name;
        this._baseSalary = _baseSalary;
    }
    // get baseSalary(): number {
    //   return this._baseSalary;
    // }
    get salaryWithBonous() {
        return this._baseSalary + 5000;
    }
    set baseSalary(newSalary) {
        if (newSalary < 0)
            throw new Error("You Cannot set nagetive value");
        this._baseSalary = newSalary;
    }
    describe() {
        return `${this.name} earns ${this.baseSalary}`;
    }
}
class Manager extends Employee {
    teamMemberCount;
    // teamMemberCount: number;
    // constructor(name: string, _baseSalary: number, teamMemberCount: number) {
    //   super(name, _baseSalary)
    //   this.teamMemberCount = teamMemberCount;
    // }
    constructor(name, _baseSalary, teamMemberCount) {
        super(name, _baseSalary);
        this.teamMemberCount = teamMemberCount;
    }
    describeMember() {
        return `${this.name} manages ${this.teamMemberCount} people`;
    }
    describeManager() {
        return `${this.name} earns ${this._baseSalary}`;
    }
}
const employee = new Employee("mohi", 1111111);
const employee1 = new Employee("mahmud", 222222);
console.log(employee, employee1);
console.log(employee.describe());
const manger = new Manager("mohiuddin", 77777, 5);
console.log(manger);
// console.log(manger.describe());
console.log(manger.describeMember());
export {};
