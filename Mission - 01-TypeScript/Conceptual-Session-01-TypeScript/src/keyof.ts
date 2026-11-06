const fare = {
  ricksaw: 30,
  cng: 300,
  bus: 20,
  taxi: 500,
  bike: 50,
  train: 100,
  metro: 40,
  jeep: 150,
  van: 80,
  truck: 120,
  auto: 25,
  cycle: 0,
};


type Vehicle = keyof typeof fare

const getFare = (v: Vehicle) => {
return fare[v]

};
// console.log(fare);
console.log(getFare("metro"));

