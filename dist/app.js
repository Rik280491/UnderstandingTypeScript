"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const accounting = new Department(5, "Accounting");
accounting.addEmployee("Max");
console.log(accounting);
accounting.describe();
accounting.printEmployeeInfo();
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
}
const computing = new ITDepartment(29, ['Max']);
computing.addEmployee("Rik");
console.log(computing);
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
    }
    addEmployee(name) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
    }
    printReports() {
        console.log(this.reports);
    }
}
const auditing = new AccountingDepartment(56, []);
auditing.addReport('Spend within your means');
auditing.addEmployee('Mike');
auditing.printReports();
console.log(auditing);
//# sourceMappingURL=app.js.map