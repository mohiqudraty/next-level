//* Top Types
let anyT = "MoHi";
// anyT = 55;
console.log(anyT.toUpperCase());
let unknownT = "hello";
// Error: Type 'unknown' is not assignable to type 'string'
// let str: string = val;
// You must narrow the type first:
if (typeof unknownT === "string") {
    let str = unknownT; // OK
}
//* Core types
let st = "Mohi";
let num = 5555;
const currentUser = null;
//* Unit type
const greet = () => {
    console.log("Wellcome");
};
console.log(greet());
//* Sub-type  of unit type
const greet1 = () => {
    console.log("Wellcome");
};
console.log(greet1());
//* Bottom type
const showErr = (msg) => {
    throw new Error(msg);
};
export {};
// console.log(showErr("mohiuddin"));
