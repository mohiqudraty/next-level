//* type alias vs interface

//? Interface is ganerally connected to objects
//? type alias is more connected to literals, union, tuples, primitives


//TODO: Type Alias------------
type ID = number;

//! interface id = number;  'number' only refers to a type, but is being used as a value here.

type Role = "admin" | "member";

//! interface Roles = "admin" | "member";

interface User {
  name: string;
  id: ID;
  role: Role;
}

const user: User = {
  id: 55,
  name: "MoHi",
  role: "admin",
};


//TODO: Interface ----------------

interface Animal {
  name: string;
}

interface Cat extends Animal {
  color: string;

}

const cat: Cat = {
  name: "cutepi",
  color: "white"
}


//TODO: Intersection
type Vehicle = {
  brand: string
}
//TODO: Intersection
type Car = Vehicle & {
  //? & symbol is used to perform intersection
  model: string
}

const car: Car =
{
  brand: "BMW",
  model: "2A"
}


//**if we create multiple interface with same name those will be merge together

interface IEmployee{
  id:number
}

interface IEmployeee {
  name: string
}


//! we can not use mutiple type with same name --

// type  TUser = {id:number}
// type  TUser =  {name: string}
