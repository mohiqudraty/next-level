let a: undefined = undefined;
let b: null = null;
let c: void;

const find = (id: number): string | undefined => {
return id === 1 ? "Mohi-vai" : undefined
}


console.log(find(1));



let userName: null | string = null;
let age: number | null;
userName = "mohi";
age = 24;
console.log(userName, age);




type Pet = "cat" | "dog"

const sound = (p: Pet) => {
  switch (p) {
    case "cat": return "meow"
    case "dog": return "woof"
    default:
      return p
  }
}

console.log(sound("cat"));
