const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamOutput = [];
const idArray = [];
//name 
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function generateTeam() {
    function createManager() {
        console.log("Let's build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "If you are the manager, what is your name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter something."
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "If you're the manager, what's your ID?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                        );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a unique number greater than zero."
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNum",
                message: "What is your manager's office number?",
                validate: answer => {
                    const pass = answers.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a unique number greater than zero.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail);
            teamOutput.push(manager);
            idArray.push(answers.managerId)
            makeTeam();
        });
    }

    function makeTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "employeeChoice",
                choices: ["Engineer", "Intern", "No more team members to add!"]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        })
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's ID?",
                validate: answer => {
                    const pass = answers.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID already exists. Please enter a unique number greater than zero."
                        } else {
                            return true;
                        }
                    }
                    return "Please enter a positive number greater than zero."
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineer's Github username?",
                valdiate: answer => {
                    if (answer !=="") {
                        return true;
                    }
                    return "Please enter something."
                }
            }
        ])
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's ID?",
                validate: answer => {
                    const pass = answers.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID already exists. Please enter a unique number greater than zero."
                        } else {
                            return true;
                        }
                    }
                    return "Please enter a positive number greater than zero."
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is the intern's school?",
                valdiate: answer => {
                    if (answer !=="") {
                        return true;
                    }
                    return "Please enter something."
                }
            }
        ])
    }
    createManager();
}

generateTeam();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



// Create the output directory if the output path doesn't exist
function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSynch(outputPath, render(teamOutput), "utf-8")
}