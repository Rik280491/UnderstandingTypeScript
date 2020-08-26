// GENERICS

// Array<string> is the same as string[]
const names: Array<string> = ["Rik", "Max"];

// Promise<string> says that this is a promise that will yield a string
const promise: Promise<string> = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("This is done!");
	}, 2000);
});

// so if we declare Promise<number> this would bug out - cant call split on number
promise.then((data) => {
	data.split(" ");
});

// CUSTOM GENERICS

// types are set dynamically when we call the function
// extends is a constraint, must now pass objects in.
function merge<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Rik" }, { age: 29 });
console.log(mergedObj.name);

// without this (or a custom type) we cannot call length on element in the countAndDescribe fn. We are ensuring element has a length property
interface Lenghty {
	length: number;
}

function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
	let descriptionText = "No value";
	if (element.length === 1) {
		descriptionText = "Has 1 element";
	} else if (element.length > 1) {
		descriptionText = `Has ${element.length} elements`;
	}
	return [element, descriptionText];
}

console.log(countAndDescribe("Testing"));

// keyof constraint. To tell TS that U is a key in the U object.
function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return obj[key];
}

extractAndConvert({ name: "Rik" }, "name");
