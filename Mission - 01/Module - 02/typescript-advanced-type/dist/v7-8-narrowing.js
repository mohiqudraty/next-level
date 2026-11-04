//* typeof
let x = 555;
console.log(typeof x);
//* Type Guard
const print = (value) => {
    if (typeof value == "string")
        return value.toUpperCase();
    return value;
};
console.log(print(545554));
const loggedInUser = {
    name: "mohiuddin",
    address: {
        street: "ABC"
    }
};
const showAddress = (user) => {
    if (user && user.address) {
        console.log(user.address.street);
        return;
    }
    else
        return "User Not Found!";
};
showAddress(loggedInUser);
//* some caveat of Type Guard
// const printAll = (x: string | string[] | null) => {
//   if (x && typeof x === "object") {
//     for (let str of x) {
//       console.log(str);
//     }
//   } else if (typeof x === "string") {
//     console.log(x);
//   } else {
//     console.log("Empty String");
//   }
// }
// printAll(["mohi", "mahmud"])
// printAll(null)
//* Equality
const printAll = (x) => {
    if (x !== null) {
        if (typeof x === "object") {
            for (let str of x) {
                console.log(str);
                return;
            }
        }
        console.log(x);
        return;
    }
    console.log("EMPTY");
};
printAll("MOHI");
const move = (animal) => {
    if ("fly" in animal) {
        animal.fly();
        return;
    }
    animal.swim();
};
//* "instanceof" check
// const date = new Date();
// const err = new Error("Something went wrong!")
// console.log(date instanceof Date);
// console.log(err instanceof Error);
const showDate = (x) => {
    if (x instanceof Date) {
        console.log(x.toISOString());
        return;
    }
    const date = new Date(x);
    console.log(date.toISOString());
};
showDate(new Date("12/12/2000"));
showDate("01-12-2000");
const getArea = (shape) => {
    if (shape.kind === "circle") {
        console.log(shape.radius);
    }
    else {
        console.log(shape.sideLength);
    }
};
export {};
