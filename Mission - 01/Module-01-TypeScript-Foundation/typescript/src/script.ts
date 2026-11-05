// tsc -- init  to create a tsconfig.json file
// tsc --watch for turn on watch mode (Watching for file changes.)

const myName: string = "MoHi";
const myAge: number = 25;
const isMarried: boolean = false;
const mySymbol: symbol = Symbol();
const myNumber: bigint = 99n;

//* type safe function
const addNumber = (a: number, b: number): number => {
  return a + b;
};
console.log(addNumber(100, 50));

//* Array, Tuple and rendomly modifier

//**Array**/
const array: Array<string> = ["MoHi", "Mahmud", "Qudraty"];

const stArr: string[] = ["Mohi", "Uddin", "Qudrati"];
const numArr: number[] = [55, 33, 66];

//**Tuple**/

// ---> can modify
// const sylhetLatLong: [number, number] = [24.886436, 91.880722]

//---> can not modify if include readonly
const sylhetLatLong: readonly [number, number] = [24.886436, 91.880722];

//****/
//* Optional, Default and Rest Parameters (...args)

// we can add ? for optional like optional chaining
const concateName = (firstName: string, lastName?: string) => {
  if (lastName) return firstName;
  return firstName + " " + lastName;
};

concateName("mohi");

//* Default Parameter
//  --------- if we use only one default parameter then we should use this as a second prameter then typescript can undarstand easily without mantioning the type and also ts add optional for this
// if we dont return anyting then ts set the type voide*//
const greetings = (fullName: string, greeting = "Good Morning") => {
  console.log(greeting + " " + fullName);
};
greetings("Mohiuddin");

//*Rest Parameters (...args)

const sum = (...num: number[]) => {
  return num.reduce((total, sum) => total + sum, 0);
};
sum(1, 2, 3, 4, 5);

const userAction = (
  ...args: [name: string, age: number, isActive: boolean]
) => {
  const [name, age] = args;
  console.log(name + 'is' + age + "old");
  
};
userAction("mohiuddin", 25, true);


//* Object type, Type alias and interface

//* type alias  --- with = equal
type TUser = {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
  badges: string[];
};

type Address = { street: string; HoldingNo: number };

//* Interface   --- without = equal
 interface IUser {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
   badges: string[];
   address: Address
};



const user: TUser = {
  name: "MoHi",
  age: 25,
  isActive: true,
  action: () => console.log(11),
  badges: ["A", "B", "C"],
};
console.log(user);

const user1:IUser  = {
  name: "MoHi",
  age: 25, isActive: true,
  action: () => console.log(11),
  badges: ["A", "B", "C"],
  address: {street: "shimultala",HoldingNo:83}
}
console.log(user);


/* const user: {
  name: string
  age: number
  isActive: boolean
  action: () => void
  badges: string[]
} = {
  name: "MoHi", age: 25, isActive: true, action: ()=> console.log(11), badges: ["A", "B", "C"]
  ,
} */
