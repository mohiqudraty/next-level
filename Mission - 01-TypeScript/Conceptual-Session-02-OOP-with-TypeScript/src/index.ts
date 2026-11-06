class Account {
  // readonly id: number;
  // owner: string;
  // private _balance: number;
  constructor(
    readonly id: number,
    public owner: string,
    private _balance: number,
  ) {}

  private verifyAccount() {}

  deposit(amount: number) {
    if (amount <= 0) throw new Error("invalid amount");
    this._balance = this._balance + amount;
  }
  get Balance() {
    return this._balance;
  }
}

const account = new Account(1, "mohi", 10000);

account.deposit(500);

// console.log(account._balance);

console.log(account.Balance);

console.log(account instanceof Account);







class Person {
  constructor(public firstName: string, public lastName: string){}


  get fullName() {
  return this.firstName +" "+ this.lastName
}


  talk() {
    console.log("Talking");
  }
  walk() {
    console.log("Walking");
  }

}
const person = new Person("mohi", "qudraty")
console.log(person.fullName);

class Student extends Person{
  attendClass() {
    console.log("attended class");
    
    this.walk()
    this.talk()
  }
}
class Teacher extends Person {
  override get fullName() {
    return "Professor " + this.firstName + " " + this.lastName;
  }
  checking() {
  console.log("checking assignment");
}
}

class Principle extends Person {
  override get fullName() {
    return "Principle" + super.fullName
  }
}


const student = new Student("mohi", "uddin")
const teacher = new Teacher("mahmud", "qudrati");
const principle = new Principle("sahin", "alom")
// console.log(teacher.fullName);
// console.log(principle.fullName);
// student.attendClass()
// teacher.checking()

const printNames = (people: Person[]) => {
  for(let person of people) console.log(person.fullName);
}
printNames([
  student,
  teacher,
  principle
])


