//  unknown is stricter than any, and so it is a better option.  
var userInput;
var userName;
userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
    userName = userInput;
}
// with any, userName = userInput would work, whereas for unknown there is some type checking needed. 
var generateError = function (message, code) {
    throw { message: message, errorCode: code };
};
generateError('An error occured', 500);
