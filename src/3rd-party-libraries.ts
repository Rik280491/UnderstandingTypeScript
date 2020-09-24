// for class transformer. reflect-metadata import would need to go in the root file, app.ts
import "reflect-metadata";
import { plainToClass } from "class-transformer";
// class-validator
import { IsNotEmpty, IsNumber, IsPositive, validate } from "class-validator";

// this would error out in TS as its written in JS (still can get output if set "noEmitOnError" to false)
// need to install @types/lodash
import _ from "lodash";

console.log(_.shuffle([1, 2, 3]));

// aside: can use the declare keyword for global variables that you know exist, but TS doesnt

// Class Transformers

// data from server, not instances of class Product
const products = [
	{ title: "A Carpet", price: 12.99 },
	{ title: "A Book", price: 5.99 },
];
// would have to do this to make them instances of our Product class
// const loadedProducts = products.map(prod => {
//     return new products(prod.title, prod.price)
// })

// this is cumbersome. Use the class transformer package

const loadedProducts = plainToClass(Product, products);

// Class-Validator - utilises TS
// "experimentalDecorators" in ts.config needs to set to true

class Product {
	@IsNotEmpty()
	title: string;
	@IsNumber()
	@IsPositive()
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}

	getInfo() {
		return [this.title, `$${this.price}`];
	}
}

const newProd = new Product("", -4.99);
validate(newProd).then((errors) => {
	if (errors.length > 0) {
		console.log("Validation Errors!");
		console.log(errors);
	} else {
		console.log(newProd.getInfo());
	}
});
