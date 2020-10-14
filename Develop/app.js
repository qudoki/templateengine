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
                validate: answers => {
                    if (answers !== "") {
                        return true;
                    }
                    return "Please enter something."
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "If you're the manager, what's your ID?",
                validate: answers => {
                    const pass = answers.match(
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
                validate: answers => {
                    const pass = answers.match(
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
                message: "What is your manager's office number (no dashes)?",
                validate: answers => {
                    const pass = answers.match(
                        //regex
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a unique number greater than zero.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNum);
            teamOutput.push(manager);
            idArray.push(answers.managerId)
            makeTeamMember();
        });
    }

    function makeTeamMember() {
        inquirer.prompt([
            {
                type: "list",
                name: "employeeChoice",
                choices: ["Engineer", "Intern", "No more team members to add!"]
            }
        ]).then(answers => {
            switch (answers.employeeChoice) {
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
                    const pass = answer.match(
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
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter something."
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamOutput.push(engineer);
            idArray.push(answers.engineerId)
            makeTeamMember();
        });
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
                    const pass = answer.match(
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
                valdiate: answers => {
                    if (answers !== "") {
                        return true;
                    }
                    return "Please enter something."
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamOutput.push(intern);
            idArray.push(answers.internId)
            makeTeamMember();
        });
    }
    createManager();
}

generateTeam();

// Create the output directory if the output path doesn't exist
function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamOutput), "utf-8")
}