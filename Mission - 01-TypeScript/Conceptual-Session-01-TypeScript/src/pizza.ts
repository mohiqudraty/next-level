type Toppings = "cheese" | "olive" | "corn" | "eggs" | "beef"

export type Pizza = {
  name: string
  toppings: Toppings[]
}

export const menu: Pizza[] = [
  {
    name: "Pizza Eggs",
    toppings: ["cheese", "eggs"]
  },
  {
    name: "Pizza beef",
    toppings: ["cheese", "corn", "beef"]
  },
  {
    name: "Pizza normal",
    toppings: ["cheese", "corn", "olive"]
  }
] 

export const makePizza = (name: string, ...toppings: Toppings[]) =>{
  return {name, toppings}
}