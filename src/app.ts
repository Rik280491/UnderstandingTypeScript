class Department {
	// private readonly id: number; (readonly - cannot be changed after initialisation)
	// public name: string;
	protected employees: string[] = [];

	constructor(private readonly id: number, public name: string) {}
    

	// (this: department) tells TS that this should always refer to an instance of the Department class
	describe(this: Department) {
		console.log(`Department (${this.id}): ${this.name}`);
	}

	addEmployee(employee: string) {
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


// accounting.employees[1] = 'Anna' - not ideal. We only want one uniform approach. if addEmployee func has validation for example, we would lose that.
// TS private (see constructor) stops this. Only methods inside the class (not in subclasses: use protected in this case) can access the employees property.

accounting.describe();
accounting.printEmployeeInfo();


// INHERITANCE // 

class ITDepartment extends Department {
    constructor(id: number, public admins: string[]) {
        super(id, 'IT');
    }
}

const computing = new ITDepartment(29, ['Max'])
computing.addEmployee("Rik")
console.log(computing)


class AccountingDepartment extends Department {
    constructor(id: number, private reports: string[]) {
        super(id, 'Accounting')
    }

    // overrides superclass method of the same name
    addEmployee(name: string) {
        if (name === 'Max') {
            return
        }
        this.employees.push(name)
    }
    addReport(text: string) {
        this.reports.push(text)
    }

    printReports() {
        console.log(this.reports)
    }
}

const auditing = new AccountingDepartment( 56, [])

auditing.addReport('Spend within your means')
auditing.addEmployee('Mike')
auditing.printReports()
console.log(auditing)