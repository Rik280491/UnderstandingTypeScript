abstract class Department {
    // private readonly id: number; (readonly - cannot be changed after initialisation)
	// public name: string;
	protected employees: string[] = [];

    // protected - subclasses have access
	constructor(protected readonly id: number, public name: string) {}

    // called on class itself, not instance
    static createEmployee(name: string) {
        return {name: name}
    }


    // (this: department) tells TS that this should always refer to an instance of the Department class or its subclasses if abstract
    // abstract forces inheriting classes to have their own describe methods
	abstract describe(this: Department): void

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInfo() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}

// static
const employee1 = Department.createEmployee('Rik')
console.log(employee1)

// cannot create an instance of an abstract class
// const accounting = new Department(5, "Accounting");

// accounting.addEmployee("Max");
// console.log(accounting);

// accounting.employees[1] = 'Anna' - not ideal. We only want one uniform approach. if addEmployee func has validation for example, we would lose that.
// TS private stops this. Only methods inside the class (not in subclasses: use protected in this case) can access the employees property.

// accounting.describe();
// accounting.printEmployeeInfo();

// INHERITANCE //

class ITDepartment extends Department {
	constructor(id: number, public admins: string[]) {
		super(id, "IT");
    }
    
    describe() {
        console.log(`IT Department - ID: ${this.id}`)
    }
}


const computing = new ITDepartment(29, ["Max"]);
computing.addEmployee("Rik");
console.log(computing);

computing.describe()


class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment

	// now publically accessible using setters and getters
	get mostRecentReport() {
		if (this.lastReport) {
			return this.lastReport;
		}
		throw new Error("No report found");
	}

	set mostRecentReport(value: string) {
		if (!value) {
			throw new Error("Please enter a valid value");
		}
		this.addReport(value);
	}

    // prvivate constructor makes this a singleton. Can only have one instance 
	private constructor(id: number, private reports: string[]) {
		super(id, "Accounting");
		this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance 
        }
        this.instance = new AccountingDepartment(56, [])
        return this.instance
    }
    
    describe() {
        console.log(`Accounting Department - ID: ${this.id}`)
    }

	// overrides superclass method of the same name
	addEmployee(name: string) {
		if (name === "Max") {
			return;
		}
		this.employees.push(name);
	}
	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}

	printReports() {
		console.log(this.reports);
	}
}

// const auditing = new AccountingDepartment(56, []);
// singleton, use class method to create instance
const auditing = AccountingDepartment.getInstance()

auditing.addReport("Spend within your means");
auditing.addEmployee("Mike");
auditing.describe()
auditing.printReports();
console.log(auditing);

console.log(auditing.mostRecentReport);
// setter
auditing.mostRecentReport = 'Year End Report'

