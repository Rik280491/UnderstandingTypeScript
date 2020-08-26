"use strict";
const names = ["Rik", "Max"];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("This is done!");
    }, 2000);
});
promise.then((data) => {
    data.split(" ");
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Rik" }, { age: 29 });
console.log(mergedObj.name);
function countAndDescribe(element) {
    let descriptionText = "No value";
    if (element.length === 1) {
        descriptionText = "Has 1 element";
    }
    else if (element.length > 1) {
        descriptionText = `Has ${element.length} elements`;
    }
    return [element, descriptionText];
}
console.log(countAndDescribe("Testing"));
function extractAndConvert(obj, key) {
    return obj[key];
}
extractAndConvert({ name: "Rik" }, "name");
//# sourceMappingURL=app.js.map