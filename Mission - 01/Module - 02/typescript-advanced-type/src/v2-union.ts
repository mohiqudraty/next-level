//* Literal type
type status = "pending"
const status: status = "pending"
console.log(status);


//* Basic Union
type Identity = string | number;

const id: Identity = 34323;
console.log(id);


//* Literal Union
type Role = "user" | "admin" | "manager";

const role: Role = "admin"
console.log(role);


//* Object Union
type Admin = { id: number, role: "admin", previleges: string[] }
type Member = { id: number, role: "member", plans: string[] }

type User = Admin | Member;

const user: User = { id: 11, role: "member", plans: ['regular', 'vip'] }
console.log(user
);

