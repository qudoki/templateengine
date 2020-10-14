// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
    printInfo() {
        console.log(`Employee Name: ${this.name}`)
        console.log(`Employee ID: ${this.id}`)
        console.log(`Employee Email: ${this.email}`)
        console.log(`Employee Role: ${this.getRole}`)
        console.log(`Employee School: ${this.getSchool}`)
    }
}

module.exports = Intern