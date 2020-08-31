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

// underscore on ln17 tells TS that we are aware but will not be using it.
// here we've created a decorator to find an element on the dom(hookId) and change its text(template)
function WithTemplate(template: string, hookId: string) {
	return function (_: Function) {
		const hookEl = document.getElementById(hookId);
		if (hookEl) {
			hookEl.innerHTML = template;
		}
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
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log("Accessor Decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

// calling dec on method
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
