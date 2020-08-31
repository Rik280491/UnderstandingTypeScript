// GENERICS

//  Flexibility combined with Type Safety

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

// GENERIC CLASSES

class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		if (this.data.indexOf(item) === -1) {
			return;
		}
		this.data.splice(this.data.indexOf(item), 1);
	}

	getItems() {
		return [...this.data];
	}
}

// as in functions, you can dynamically set types, here during instantiation
const textStorage = new DataStorage<string>();
textStorage.addItem("Rik");
textStorage.addItem("Max");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// Reminder: objects in JS are reference types i.e non-primitive. Should use a more specialised data storage for objects, so we don't get the behaviour below. The removeItem fn needs changing.
// Hence, we have constrained the T in the DataStorage class to primitive types.
// const objStorage = new DataStorage<object>()
// objStorage.addItem({name: 'Rikesh'})
// objStorage.addItem({name: 'Max'})
// objStorage.removeItem({name: 'Max'}) // [{ name: 'Rikesh }]
// objStorage.removeItem({name: 'Rikesh'}) // [{ name: 'Rikesh }]
// console.log(objStorage.getItems())

// GENERIC UTILITY TYPES

// These are a few examples, see docs for full list

// partial types - properties are optional
interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
}

// without the partial, TS would complain about the empty courseGoal obj
// ofc you could just return { title: title, description: description, completeUntil: date } but this is just to show how you could use a Partial.
function createCourseGoal(
	title: string,
	description: string,
	date: Date
): CourseGoal {
	let courseGoal: Partial<CourseGoal> = {};
	courseGoal.title = title;
	courseGoal.description = description;
	courseGoal.completeUntil = date;
	return courseGoal as CourseGoal;
}

// readonly types - not allowed to change properties.

const foo: Readonly<string[]> = ["Rik", "Sports"];
// foo.push("Max");
// foo.pop();
