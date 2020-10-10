// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Engineer = require("./Employee");

class Employee extends Engineer {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
    printInfo() {
        console.log(`Employee Name: ${this.name}`)
        console.log(`Employee ID: ${this.id}`)
        console.log(`Employee Email: ${this.email}`)
        console.log(`Employee Role: ${this.getRole}`)
        console.log(`Employee Github: ${this.getGithub}`)
    }
}

// Test below
const engineer = new Engineer("qudoki")
console.log(engineer);
console.log(engineer.printInfo());
console.log(engineer.getRole());