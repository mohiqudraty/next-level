//* Utility Types

//* Partial

interface User{
  id: string;
  name: string;
  email: string;
}

const updateProfile = (id: string, data: Partial<User>) => {

}
updateProfile("22", {name:"Mohiuddin", email: "mohi.qudraty@gmail.com"})

//* required

interface Config {
  apiKey?: string;
  timeout?: number;
}


const initialize = (config: Required<Config>) => {

}

initialize({ apiKey: "v1/api", timeout: 3000 })


//* Pic

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}


type ProductPreview = Pick<Product, "name" | "description">

const preview: ProductPreview = {
  name: "IPhone",
  description: "new model iphone 20",
};


//* Omit

interface Employee {
  id: number;
  name: string;
  salary: number;
  nid: string;
}

type PublicEmployee = Omit<Employee, "salary" | "nid">

const directoryEntry: PublicEmployee = {
  id: 32,
  name: "mohi",
};



//* Record

type Enviroment = "development" | "staging" | "production";


interface IEnviroment {
  development: string;
  staging: string;
  production: string;
}

const apiUrls: Record<Enviroment, string> = {
  development: "httpsD",
  production: "httpsP",
staging: "httpsS"
};