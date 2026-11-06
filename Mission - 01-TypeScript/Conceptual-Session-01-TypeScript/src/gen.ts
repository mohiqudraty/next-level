const names: string[] = ["John", "Jane", "Bob"];

const prices: number[] = [30, 300, 20];

const cart: (string | number)[] = ["Laptop", 999, "Mouse", 25];

console.log(cart);


interface LunchBox<T> {
  food: T
}

const myLucnhBox: LunchBox<{name: string, count: number}> = {
  food: {
    name: "kachhi",
    count: 3
  }
}


type ApiResponse<T> = {
  success: boolean,
  data: T 
}

type Studentresponse = ApiResponse<{ id: number, name: string, age: number }>

type ErrorResponse = ApiResponse<{message: string}>