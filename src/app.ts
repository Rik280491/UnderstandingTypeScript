// INTERSECTION TYPES
// Note: could use interfaces inheritance too

type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: "Rik",
	privileges: ["create-server"],
	startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
// Universal type is number because it intersects in both.

// TYPE GUARDS

// besides being an example of type guarding, this is also a FUNCTION OVERLOAD (arrow fns incompatible)
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: number, b: number): number;
function add(a: Combinable, b: Combinable) {
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return a + b;
}

const result = add("Rik", "B");
result.split("");
// this would error out if not for the function overloads.

// typeof is JS and checks at runtime. Not always a good option for type guarding TS only features.

type UnknownEmployee = Employee | Admin;

// recap. js 'in' operator checks if it is a property
const printEmployeeInfo = (emp: UnknownEmployee) => {
	console.log(`Name: ${emp.name}`);
	if ("privileges" in emp) {
		console.log(`Privileges: ${emp.privileges}`);
	}
	if ("startDate" in emp) {
		console.log(`Start Date: ${emp.startDate}`);
	}
};

printEmployeeInfo(e1);

// JS instanceof
class Car {
	drive() {
		console.log("Driving...");
	}
}

class Truck {
	drive() {
		console.log("Trucking...");
	}

	loadCargo(amount: number) {
		console.log(`Loading cargo: ${amount} `);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

// note: can use in operator here
const useVehicle = (vehicle: Vehicle) => {
	vehicle.drive();
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
};

useVehicle(v2);

// DISCRIMINATED UNIONS
// available when working with object types

// setting type or kind (name doesnt matter) to ensure type safety.
interface Bird {
	type: "bird";
	flyingSpeed: number;
}

interface Horse {
	type: "horse";
	runningSpeed: number;
}

type Animal = Bird | Horse;

// cannot use instanceof as interface is a TS feature
const animalSpeed = (animal: Animal) => {
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

// TYPE CASTING

// ! tells TS that it is not null, that it exists in our HTML

// either syntax is valid. first syntax has issues with JSX and React
const button = <HTMLButtonElement>document.querySelector("#main-button")!;
// const userInput = <HTMLInputElement>document.getElementById('user-input')!
const userInput = document.getElementById("user-input")! as HTMLInputElement;

userInput.value = "Hello";

// if not sure, use if check rather than ! and casting. If you cast, TS assumes element is not null
if (userInput) {
	(userInput as HTMLInputElement).value = "Hello";
}

// INDEX TYPES

// dont know in advance how many properties we will have and their names
interface ErrorContainer {
	[prop: string]: string;
}

const errors: ErrorContainer = {
	email: "Not a valid email!",
	username: "Must start with a capital letter",
};

//  OPTIONAL CHAINING

// what if we are fetching from backend and some data is not set at that point?
const fetchedUserData = {
	id: "u1",
	name: "Rik",
	job: { title: "Dev", description: "TypeScript" },
};

// ? here tells TS to only access if it exists. an if check.
console.log(fetchedUserData?.job?.title);

// NULLISH COALESCING

const usersInput = null;

// ?? - the nullish coelescing operator. Returns right side if left side is null or undefined (not if its an empty string)
const storedData = usersInput ?? "DEFAULT";

console.log(storedData);
