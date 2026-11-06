
type User = { name: string; age: number };

const response = await fetch("/api/user");
const data: unknown = await response.json();

// One object, using `as`
const user = data as User;

console.log(user.name); // "John"
console.log(user.age);  // 25   
