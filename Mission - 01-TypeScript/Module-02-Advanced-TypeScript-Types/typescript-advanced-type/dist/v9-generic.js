const wrapArray = (value) => {
    return [value];
};
const stringArray = wrapArray("ABCDEFG");
const numberArray = wrapArray(34678348);
console.log(stringArray.map((item) => item.toLocaleLowerCase()));
console.log(stringArray);
console.log(numberArray);
const UserRes = {
    statusCode: 200,
    success: true,
    data: {
        name: "Mohi",
        role: "admin",
    },
};
const blogres = {
    statusCode: 200,
    success: true,
    data: {
        title: "TypeScript",
        description: "SuperSet of JavaScript",
        date: "12-22-2000"
    }
};
export {};
