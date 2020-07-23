// HOW TS WORKS WITH ES6

// ARROW FUNCTIONS

// b has a default. default args must be last in the list, a having a default wouldnt work. 
const add = (a: number, b: number = 1) => a + b

const printOutput = (output: string | number) => console.log(output)

// printOutput(add(5, 2))

const button = document.querySelector('button')

if (button) {
    button.addEventListener('click', event => console.log(event))
}

printOutput(add(5)) // 6

// SPREAD OPERATOR

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking']

activeHobbies.push(...hobbies) // ['Hiking', 'Sports', 'Cooking']

const person = {
    firstName: 'Rik',
    age: 29,
}

const copiedPerson = { ...person }


// REST PARAMS

// don't have to set a number of params. passed into the function as an array. 

const sum = (...numbers: number[]) => {
   return numbers.reduce((currentResult, currentValue) => {
        return currentResult + currentValue
    }, 0)
}

console.log(sum(5, 10, 2, 3.7));


// ARRAY & OBJECT DESTRUCTURING

// also works with let
const [hobby1, hobby2, ...remainingHobbies] = activeHobbies
// hobby 1 = 'Hiking'
// hobby 2 = 'Sports'
// remaingingHobbies = ['Cooking']

// can rename using alias, but does not change orig person object - this is JS sytax, not TS
const { firstName: nickname, age } = person
console.log(nickname) // Rik
console.log(person) // { firstName: "Rik", age: 29} 

