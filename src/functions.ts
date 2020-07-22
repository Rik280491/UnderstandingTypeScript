// RETURN TYPES //

// return type is number as inferred by TS
function add(n1: number, n2: number) {
    return n1 + n2 
}

// return type is void as this fn does not return anything
function printResult(num: number): void {
    console.log('Result: ' + num)
}

function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
    const result = n1 + n2; 
    callback(result)
}
 
printResult(add(5, 12));


// FUNCTION TYPES, (param: type) => return type
let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(8, 8))

// TS will let you write return but as we have declared type void (line 13) function will not return anything
addAndHandle(10, 20, (result) => {
    console.log(result)
    return result
})