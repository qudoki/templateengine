// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return "Employee";
    }
    printInfo() {
        console.log(`Employee Name: ${this.name}`)
        console.log(`Employee ID: ${this.id}`)
        console.log(`Employee Email: ${this.email}`)
        console.log(`Employee Role: ${this.getRole}`)
    }
}
module.exports = Employee

// Test below
// const employee = new Employee("Quinn", "qudoki", "qdong327@gmail.com")
// console.log(employee);
// console.log(employee.printInfo());
// console.log(employee.getRole());