//* type alias vs interface
const user = {
    id: 55,
    name: "MoHi",
    role: "admin",
};
const cat = {
    name: "cutepi",
    color: "white"
};
const car = {
    brand: "BMW",
    model: "2A"
};
export {};
//! we can not use mutiple type with same name --
// type  TUser = {id:number}
// type  TUser =  {name: string}
