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
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Rik");
textStorage.addItem("Max");
textStorage.removeItem("Max");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const foo = ["Rik", "Sports"];
//# sourceMappingURL=app.js.map