const wrapArray = <T>(value: T) => {
  return [value];
};

const stringArray = wrapArray<string>("ABCDEFG");
const numberArray = wrapArray<number>(34678348);

console.log(stringArray.map((item) => item.toLocaleLowerCase()));

console.log(stringArray);
console.log(numberArray);

interface User {
    name: string;
    role: string;
}

interface Blog {
    title: string;
    description: string;
    date: string;
}

interface ApiRespons<T> {
  data: T;
  success: boolean;
  statusCode: number;
}

type UserRespons = ApiRespons<User>;
type BlogRespons = ApiRespons<Blog>;

const UserRes: UserRespons = {
  statusCode: 200,
  success: true,
  data: {
    name: "Mohi",
    role: "admin",
  },
};


const blogres: BlogRespons = {
  statusCode: 200,
  success: true,
  data: {
    title: "TypeScript",
    description: "SuperSet of JavaScript",
    date: "12-22-2000"
  }
}