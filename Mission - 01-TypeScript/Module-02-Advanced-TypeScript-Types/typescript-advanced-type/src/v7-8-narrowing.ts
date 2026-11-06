//* typeof
let x = 555;
console.log(typeof x);

//* Type Guard
const print = (value: string | number) => {
  if (typeof value == "string") return value.toUpperCase();
  return value;
};console.log(print(545554))


//* Truthiness
type User = {
  name: string;
  address?: {
    street:string
  }
} | null;


const loggedInUser: User = {
  name: "mohiuddin",
  address: {
    street: "ABC"
  }
}

const showAddress = (user: User) => {
  if (user && user.address) {
    console.log(user.address.street);
    return 
  }else return "User Not Found!";
}
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

const printAll = (x: string | string[] | null) => {
  if (x !== null) {
    if (typeof x === "object") {
      for (let str of x) {
        console.log(str);
        return
      }
    }
    console.log(x);
    return
  }
  console.log("EMPTY");

}
printAll("MOHI")



//* "in" operator

type Bird = {fly: ()=> void}
type Fish = { swim: () => void }

const move = (animal: Bird | Fish) => {
  if ("fly" in animal) {
    animal.fly()
    return
  }
  animal.swim()
}

//* "instanceof" check

// const date = new Date();
// const err = new Error("Something went wrong!")

// console.log(date instanceof Date);
// console.log(err instanceof Error);

const showDate = (x: Date | string) => {
  if (x instanceof Date) {
    console.log(x.toISOString());
    return
  }
  const date = new Date(x)
  console.log(date.toISOString());
}

 showDate(new Date("12/12/2000"))
 showDate("01-12-2000")


//* Discriminated union

interface Circle {
  kind: "circle";
  radius: number
}

interface Square {
  kind: "square";
  sideLength: number
}

const getArea = (shape: Circle | Square) => {
  if (shape.kind === "circle") {
    console.log(shape.radius);
  } else {
    console.log(shape.sideLength);
    
  }
}