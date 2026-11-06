let heroName = "Spider Man";
let power = 3000;
let canFly = false;
let snacks = ["popcorn", "chips"];
// type id = string | number
let g = "B";
const St1 = {
    id: 1,
    roll: 3,
    age: 32,
    name: "suhan",
    className: "12",
};
const St2 = {
    id: 1,
    roll: 3,
    age: 32,
    name: "suhan",
};
const fullSt = {
    name: "mohiuddin",
    roll: 4,
    fee: 500,
    grade: "A",
};
function Pay(p) {
    if (p.method === "Bkash") {
        console.log(`Send to Bkash Number: ${p.number}`);
    }
    if (p.method === "Card") {
        console.log(`Payed By Card NO:${p.cardNumber} with ${p.cvc}`);
    }
    else {
        console.log("Pay Cash");
    }
}
Pay({ method: "Card", cardNumber: 655435432524, cvc: 438, expDate: "20-20" });
function greet(name, mode, emoji = "🤞") {
    console.log(`${emoji} - ${name} is ${mode ?? "OKey"}`);
}
greet("mohi", "happy");
export {};
//# sourceMappingURL=index.js.map