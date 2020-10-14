// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    printInfo() {
        console.log(`Employee Name: ${this.name}`)
        console.log(`Employee ID: ${this.id}`)
        console.log(`Employee Email: ${this.email}`)
        console.log(`Employee Role: ${this.getRole}`)
        console.log(`Employee Office Number: ${this.officeNumber}`)
    }
}

module.exports = Manager