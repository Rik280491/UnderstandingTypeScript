"use strict";
var _a;
const e1 = {
    name: "Rik",
    privileges: ["create-server"],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add("Rik", "B");
result.split("");
const printEmployeeInfo = (emp) => {
    console.log(`Name: ${emp.name}`);
    if ("privileges" in emp) {
        console.log(`Privileges: ${emp.privileges}`);
    }
    if ("startDate" in emp) {
        console.log(`Start Date: ${emp.startDate}`);
    }
};
printEmployeeInfo(e1);
class Car {
    drive() {
        console.log("Driving...");
    }
}
class Truck {
    drive() {
        console.log("Trucking...");
    }
    loadCargo(amount) {
        console.log(`Loading cargo: ${amount} `);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};
useVehicle(v2);
const animalSpeed = (animal) => {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
    }
    console.log(`Moving at speed ${speed}`);
};
animalSpeed({ type: "bird", flyingSpeed: 10 });
const button = document.querySelector("#main-button");
const userInput = document.getElementById("user-input");
userInput.value = "Hello";
if (userInput) {
    userInput.value = "Hello";
}
const errors = {
    email: "Not a valid email!",
    username: "Must start with a capital letter",
};
const fetchedUserData = {
    id: "u1",
    name: "Rik",
    job: { title: "Dev", description: "TypeScript" },
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const usersInput = null;
const storedData = usersInput !== null && usersInput !== void 0 ? usersInput : "DEFAULT";
console.log(storedData);
//# sourceMappingURL=app.js.map