//* Top Types
let anyT: any = "MoHi"
// anyT = 55;
console.log(anyT.toUpperCase());




let unknownT: unknown = "hello"


// Error: Type 'unknown' is not assignable to type 'string'
// let str: string = val;

// You must narrow the type first:
if (typeof unknownT === "string") {
  let str: string = unknownT; // OK
}


//* Core types

let st: string = "Mohi"
let num: number = 5555;

//* Nulish types

interface User {name: string}
type LoggedInUser = User | null;

const currentUser: LoggedInUser = null;

//* Unit type
const greet = () => {
  console.log("Wellcome");
  
};console.log(greet());



//* Sub-type  of unit type
const greet1 = (): undefined => {
  console.log("Wellcome");
};console.log(greet1());


//* Bottom type
const showErr = (msg: string): never => {
  throw new Error(msg)
}

// console.log(showErr("mohiuddin"));
