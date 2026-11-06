type Toppings = "cheese" | "olive" | "corn" | "eggs" | "beef";
export type Pizza = {
    name: string;
    toppings: Toppings[];
};
export declare const menu: Pizza[];
export declare const makePizza: (name: string, ...toppings: Toppings[]) => {
    name: string;
    toppings: Toppings[];
};
export {};
//# sourceMappingURL=pizza.d.ts.map