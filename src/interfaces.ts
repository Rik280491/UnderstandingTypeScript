// INTERFACES //

// similar to custom types. interface is only used on objects. Cant have values inside an interface
// a ? marks the property as optional. Note: ? also works in classes
interface Named {
    readonly name: string
    nickname?: string
}

// can add readonly ( cannot be changed after being set ), but not private, public, protected.
// can inherit. inheriting from more than one interface also possible, unlike in classes
interface Greetable extends Named {
	greet(phrase: string): void;
}

// this class must implement the interface and its structure/conditions. Can have more than one interface.
class Person implements Greetable {
    // readonly from interface is applied here too, but optional would need to be declared here and in the interface
    name: string;
    nickname?: string;
	age = 29;

	constructor(n: string, nn?:string) {
        this.name = n;
        if (nn) {
            this.nickname = nn
        }
	}

	greet(phrase: string) {
        if (this.nickname) {
            console.log(`${phrase} ${this.name}. I am also known as ${this.nickname}`);
        } else {
            console.log(`${phrase} ${this.name}`)
        }
	}
}

// can use an interface as a type
let user1: Greetable;

user1 = new Person("Rikesh", "Rik");

user1.greet("Hi, my name is ");

console.log(user1);


// can also use interfaces as function types

interface AddFn {
    (a: number, b: number): number
}

let add: AddFn

add = (n1: number, n2: number) => {
    return n1 + n2 
}