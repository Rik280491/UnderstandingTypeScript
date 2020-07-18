// TYPE ALIASES/CUSTOM TYPES - "create" your own types (note: not just limited to union types)
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text'; 
// type User = { name: string, age: number }; THIS WOULD WORK


// UNION TYPES allow for two or more types (Note: You won't always need this kind of runtime check with union types, it depends on the logic you are writing) 

// function combine(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-text') {
function combine(input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptor) {
	let result;
	if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
    }
    return result
}

// LITERAL TYPES allow you to specify the exact value the type must have, such as 'as-number' 
const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number')
console.log(combinedStringAges)

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames)

