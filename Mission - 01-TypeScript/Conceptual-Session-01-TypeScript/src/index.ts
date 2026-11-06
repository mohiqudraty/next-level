let heroName: string = "Spider Man";
let power: number = 3000;
let canFly: boolean = false;
let snacks: string[] = ["popcorn", "chips"];

type Grade = "A" | "B" | "C";
// type id = string | number

let g: Grade = "B";

type Student = {
  id: number;
  readonly name: string;
  age: number;
  roll: number;
  className?: string;
};

const St1: Student = {
  id: 1,
  roll: 3,
  age: 32,
  name: "suhan",
  className: "12",
};
const St2: Student = {
  id: 1,
  roll: 3,
  age: 32,
  name: "suhan",
};

// St1.name = "mohi"

// console.log(St1);

type hasName = { name: string };
type hasRoll = { roll: number };
type hasFee = { fee: number };

type FullStudent = hasName & hasRoll & hasFee & { grade: Grade };

const fullSt: FullStudent = {
  name: "mohiuddin",
  roll: 4,
  fee: 500,
  grade: "A",
};

// console.log(fullSt);

type BkashPay = { method: "Bkash"; number: number };
type CardPay = {
  method: "Card";
  cardNumber: number;
  expDate: string;
  cvc: number;
};
type CashPay = { method: "Cash" };

type Payment = BkashPay | CardPay | CashPay;

function Pay(p: Payment) {
  if (p.method === "Bkash") {
    console.log(`Send to Bkash Number: ${p.number}`);
  }
  if (p.method === "Card") {
    console.log(`Payed By Card NO:${p.cardNumber} with ${p.cvc}`);
  } else {
    console.log("Pay Cash");
  }
}

Pay({ method: "Card", cardNumber: 655435432524, cvc: 438, expDate: "20-20" });



function greet(name: string, mode?: string, emoji = "🤞") {
  console.log(`${emoji} - ${name} is ${mode ?? "OKey"}`);
}

greet("mohi", "happy")