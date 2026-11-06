export const menu = [
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
];
export const makePizza = (name, ...toppings) => {
    return { name, toppings };
};
//# sourceMappingURL=pizza.js.map