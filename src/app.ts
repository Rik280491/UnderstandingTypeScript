//  DECORATORS  //
// meta programming //

// a decorator is a function, lots of decorator fns start with a capital, but this is not a must
// this is a decorator factory - the decorator function(ln 7) is returned within the Logger fn
function Logger(logString: string) {
	return function (constructor: any) {
		console.log(logString);
		const p = new constructor();
		console.log(p.name); // "Rik"
	};
}

// here we've created a decorator to find an element on the dom(hookId) and change its text(template)
//  can return a class in a decorator. here, the return only runs when the class is instantiated. Decorators run when the class is declared and this may not always be desirable, so this is a good solution
function WithTemplate(template: string, hookId: string) {
	return function <T extends { new (...args: any[]): { name: string } }>(
		originalConstructor: T
	) {
		// const hookEl = document.getElementById(hookId);
		// const p = new originalConstructor()
		// if (hookEl) {
		// 	hookEl.innerHTML = template;
		// }
		return class extends originalConstructor {
			constructor(...args: any[]) {
				super();
				const hookEl = document.getElementById(hookId);
				if (hookEl) {
					hookEl.innerHTML = template;
					hookEl.querySelector("h1")!.textContent = this.name;
				}
			}
		};
	};
}

// with multiple decorators the lowest decorator fn runs first, bottom up. @WithTemplate and then @Logger in this case
@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
	name = "Rik";

	constructor() {
		console.log("Creating person object...");
	}
}

const pers = new Person();
console.log(pers);

// --
// decorators can be used elsewhere, not just classes

// calling dec on a property
function Log(target: any, propertyName: string) {
	console.log("Property Decorator!");
	console.log(target, propertyName);
}

// calling dec on an accessor
// can return a property descriptor
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log("Accessor Decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);
	// return {enumerable...}
}

// calling dec on method
// can also return a property descriptor here too. see ln 118 onwards starting at autobind fn, for method return types
function Log3(
	target: any,
	name: string | Symbol,
	descriptor: PropertyDescriptor
) {
	console.log("Method Decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

// calling dec on parameters
// name arg is the name of the method. position is which parameter it is in the method (its the only param here so it will be 0 (index)).
function Log4(target: any, name: string | Symbol, position: number) {
	console.log("Parameter Decorator!");
	console.log(target);
	console.log(name);
	console.log(position);
}

class Product {
	@Log
	title: string;
	private _price: number;

	@Log2
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error("Invalid Price - should be positive!");
		}
	}
	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}

// a decorator to get around needing to bind in an event listener for example.
// the value of a PropertyDescriptor points to the function.
// underscore tells TS (also in JS) that you are not interested in the values but need to accept them
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		// get: function - same thing as below
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}

class Printer {
	message = "This works!";

	@Autobind
	showMessage() {
		console.log(this.message);
	}
}

const p = new Printer();

const button = document.getElementById("main-button")!;
// reminder - 'this' refers to the target of the event, so bind(p) or arrow fn is required
// button.addEventListener('click', p.showMessage.bind(p)) // autobind fn ln 118 is to get around needing to use bind. Just as a demo using decorators, arrow fns remedies this issue post ES6.
// button.addEventListener('click', () => {
//     p.showMessage()
// })

// this works with the autobind decorator!
button.addEventListener("click", p.showMessage);

// DECORATORS FOR VALIDATION

interface ValidatorConfig {
	// this would the class name
	[property: string]: {
		[validatableProp: string]: string[]; // ['required, 'positive']
	};
}

const registeredValidators: ValidatorConfig = {};

// property decorators to ensure fields are filled out.
// target.constructor.name will give use the class name Course (see prototype)
function Required(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: [
			...registeredValidators[target.constructor.name][propName],
			"required",
		],
	};
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: [
			...registeredValidators[target.constructor.name][propName],
			"positive",
		],
	};
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	if (!objValidatorConfig) {
		return true;
	}
	let isValid = true;
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case "required":
					isValid = isValid && !!obj[prop];
					break;
				case "positive":
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return isValid;
}

class Course {
	@Required
	title: string;
	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector("#course-form")!;
courseForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const titleEl = document.getElementById("title") as HTMLInputElement;
	const priceEl = document.getElementById("price") as HTMLInputElement;

	const title = titleEl.value;
	const price = +priceEl.value;

	const createdCourse = new Course(title, price);

	if (!validate(createdCourse)) {
		alert("Empty input, please try again!");
		return;
	}
	console.log(createdCourse);
});

// want to add validation so user cannot create 'empty' course. We could use an if check in the event listener, but we can use a decorator. see Required and Positive Number fn.
