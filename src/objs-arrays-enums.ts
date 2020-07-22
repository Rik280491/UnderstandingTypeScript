// TUPLES //

// role is a tuple (added by TS). a fixed length array. 
const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]
} = {
    name: 'Rikesh',
    age: 29,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
}


// ENUM //

// enum (added by TS) - Automatically enumerated global contast indentifiers.
// You can set it to whatever you desire if you don't want default behaviour (numeric values starting at 0) Also it auto-increments so AUTHOR = 101) 

// enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR };

// const person = {
//     name: 'Rikesh',
//     age: 29,
//     hobbies: ['Sports', 'Cooking'],
//     role: Role.ADMIN
// }

// person.role.push('admin') // this would work with a tuple.
// person.role = [0, 'admin', 'user'] // but this wouldn't work

let favouriteActivities: string[];
favouriteActivities = ['Sports']

console.log(person.name)

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase())
    // console.log(hobby.map()) !!! ERROR !! TS infers that hobby is a string as hobbies was string[]
}