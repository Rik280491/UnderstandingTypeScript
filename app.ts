//  unknown is stricter than any, and so it is a better option.  
let userInput: unknown; 
let userName: string; 

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
    userName = userInput
}
// with any, userName = userInput would work, whereas for unknown there is some type checking needed. 


// the "never" type. This kind of function never returns anything. An infinite loop would be another example.
const generateError = (message: string, code: number): never => {
    throw { message: message, errorCode: code };
}

generateError('An error occured', 500);

