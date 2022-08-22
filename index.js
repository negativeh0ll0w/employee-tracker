const inquirer = require("inquirer");
const db = require('db');



const mainMenu = [
    {
      prefix: "",
      type: "list",
      name: "main",
      message: "What would you like to do?",
      choices: [
        "View Information",
        "Add Information",
        "Update a record",
        "Remove a record",
        "Exit Application",
      ],
      filter(val) {
        let valParse = val.split(" ");
        if (valParse[0] == "View") {
          return "View";
        }
        if (valParse[0] == "Add") {
          return "Add";
        }
        if (valParse[0] == "Update") {
          return "Update";
        }
        if (valParse[0] == "Remove") {
          return "remove";
        }
        if (valParse[0] == "Exit") {
          return "exit";
        }
      },
    },
    {
      prefix: "",
      type: "list",
      name: "view",
      message: "What would you like to view",
      choices: ["Departments", "Roles", "Employees", "Return to main menu"],
      when(answers) {
        if (answers.main === "View") {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      prefix: "",
      type: "list",
      name: "empView",
      message: "How would you like to view employees?",
      choices: [
        "Show all employees",
        "Show all by Manager",
        "Return to main menu",
      ],
      filter(val) {
        let valParse = val.split(" ");
        if (valParse[2] === "employees") {
          return "all";
        }
        if (valParse[3] === "Manager") {
          return "manager";
        } else {
          return "exit";
        }
      },
      when(answers) {
        if (answers.view === "Employees") {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      prefix: "",
      type: "list",
      name: "add",
      message: "What would you like to add?",
      choices: [
        "A new department",
        "A new role",
        "A new employee",
        "Return to main menu",
      ],
      filter(val) {
        let valParse = val.split(" ");
        if (valParse[2] === "department") {
          return "department";
        }
        if (valParse[2] === "role") {
          return "role";
        }
        if (valParse[2] === "employee") {
          return "employee";
        }
        if (valParse[2] === "main") {
          return "main";
        }
      },
      when(answers) {
        if (answers.main === "Add") {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      prefix: "",
      type: "list",
      name: "update",
      message: "What would you like to update?",
      choices: [
        "A department name",
        "An employee",
        "A role",
        "Return to main menu",
      ],
      when(answers) {
        if (answers.main === "Update") {
          return true;
        }
      },
      filter(val) {
        let valParse = val.split(" ");
        if (valParse[1] === "department") {
          return "department";
        }
        if (valParse[1] === "employee") {
          return "employee";
        }
        if (valParse[1] === "role") {
          return "role";
        }
        if (valParse[1] === "to") {
          return "main";
        }
      },
    },
  ];
  
  const addDeparment = [
    {
      prefix: "",
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new department?",
    },
  ];
  const addRole = [
    {
      prefix: "",
      type: "",
      name: "id",
      message: `What department ID should be used?`,
    },
    {
      prefix: "",
      type: "input",
      name: "title",
      message: "What is the title for this new role?",
    },
    {
      prefix: "",
      type: "input",
      name: "salary",
      message: "What is the salary for this new role?",
    },
  ];
  const addEmployee = {
    askNames: [
      {
        prefix: "",
        type: "input",
        name: "firstName",
        message: "What is their first name?",
      },
      {
        prefix: "",
        type: "input",
        name: "lastName",
        message: "What is their last name?",
      },
    ],
    askRole: [
      {
        prefix: "",
        type: "input",
        name: "role",
        message: "What role will they be taking (use ID)?",
      },
    ],
    askManager: [
      {
        prefix: "",
        type: "input",
        name: "manager",
        message: "Who is their supervisor (use managers employee ID)?",
      },
    ],
  };
  

  const removeRecords = [
    {
      prefix: "",
      type: "list",
      name: "remove",
      message: "What would you like to remove?",
      choices: ["A department", "A role", "An employee", "Return to main menu"],
      filter(val) {
        let valParse = val.split(" ");
        if (valParse[1] === "department") {
          return "department";
        }
        if (valParse[1] === "role") {
          return "role";
        }
        if (valParse[1] === "employee") {
          return "employee";
        } else {
          return "exit";
        }
      },
    },
  ];
  const askId = [
    {
      prefix: "",
      type: "input",
      name: "id",
      message: `Please enter the id of the record you would like to remove `,
    },
  ];
  const updateRecord = {
    recordId: [
      {
        prefix: "",
        type: "input",
        name: "id",
        message: "Please enter the ID of the record you want to update:",
      },
    ],
    department: [
      {
        prefix: "",
        type: "input",
        name: "newName",
        message: "What should be the new name be?",
      },
    ],
    role: [
      {
        prefix: "",
        type: "list",
        name: "role",
        message: "What would like to update?",
        choices: [
          "A role's title",
          "A role's salary",
          "A role's department",
          "Return to main menu",
        ],
        filter(val) {
          let valParse = val.split(" ");
          if (valParse[2] === "title") {
            return "title";
          }
          if (valParse[2] === "salary") {
            return "salary";
          }
          if (valParse[2] === "department") {
            return "department";
          }
          if (valParse[2] === "main") {
            return "main";
          }
        },
      },
      {
        prefix: "",
        type: "input",
        name: "newTitle",
        message: "What is the new name for this role?",
        when(answers) {
          if (answers.role === "title") {
            return true;
          }
        },
      },
      {
        prefix: "",
        type: "input",
        name: "newSalary",
        message: "What is the new salary for this role?",
        when(answers) {
          if (answers.role === "salary") {
            return true;
          }
        },
      },
      {
        prefix: "",
        type: "input",
        name: "newDepartment",
        message: "What is the new department for this role (Use ID)?",
        when(answers) {
          if (answers.role === "department") {
            return true;
          }
        },
      },
    ],
    employee: [
      {
        prefix: "",
        type: "list",
        name: "employee",
        message: "What would like to update?",
        choices: [
          "An employee's role",
          "An employee's manager",
          "Return to main menu",
        ],
        filter(val) {
          let valParse = val.split(" ");
          if (valParse[2] === "manager") {
            return "manager";
          }
          if (valParse[2] === "role") {
            return "role";
          }
          if (valParse[2] === "main") {
            return "main";
          }
        },
      },
      {
        prefix: "",
        type: "input",
        name: "newRole",
        message: "What is their new role (use ID)?",
        when(answers) {
          if (answers.employee === "role") {
            return true;
          }
        },
      },
      {
        prefix: "",
        type: "input",
        name: "newManager",
        message: "Who is their new manager (use manager's employee ID)?",
        when(answers) {
          if (answers.employee === "manager") {
            return true;
          }
        },
      },
    ],
  };
  
  function mainMenuPrompt() {
    answers = "";
    inquirer.prompt(questions.mainMenu).then((answers) => {
  
      let view = answers.view;
      let remove = answers.remove;
      let add = answers.add;
      let update = answers.update;
      if (view) {
        if (answers.empView) {
          if (answers.empView === "all") {
            employee.showAll();
            answers = "";
            setTimeout(mainMenuPrompt, 1000);
          }
          if (answers.empView === "manager") {
            employee.showByManager();
            answers = "";
            setTimeout(mainMenuPrompt, 1000);
          }
        }
        if (view === "Departments") {
          department.showAll();
          answers = "";
          setTimeout(mainMenuPrompt, 1000);
        }
        if (view === "Roles") {
          role.showAll();
          answers = "";
          setTimeout(mainMenuPrompt, 1000);
        }
        if (view === "Return to main menu") {
          answers = "";
          setTimeout(mainMenuPrompt, 1000);
        }
      }
      if (remove == true) {
        removeRecord();
      }
      if (remove == false) {
        answers = {};
        mainMenuPrompt();
      }
      if (add) {
        addRecord(add);
      }
      if (update) {
        updateRecord(update);
      }
    });
  }
  
  function addRecord(content) {
    if (content == "department") {
      inquirer.prompt(questions.addDeparment).then((answers) => {
        department.add(answers.newDepartment);
        setTimeout(() => {
          mainMenuPrompt();
        }, 50);
      });
    }
    if (content == "role") {
      department.showAsArray();
      inquirer.prompt(questions.addRole).then((answers) => {
        role.add(answers.title, answers.salary, answers.id);
        console.log("Complete!");
        role.showAll();
        setTimeout(() => {
          mainMenuPrompt();
        }, 50);
      });
    }
    if (content == "employee") {
      const newEmployee = { firstName: "", lastName: "", role: "", manager: "" };
      inquirer.prompt(questions.addEmployee.askNames).then((answers) => {
        newEmployee.firstName = answers.firstName;
        newEmployee.lastName = answers.lastName;
        role.showAll();
        setTimeout(() => {
          inquirer.prompt(questions.addEmployee.askRole).then((answers) => {
            newEmployee.role = answers.role;
            employee.showAll();
            setTimeout(() => {
              inquirer
                .prompt(questions.addEmployee.askManager)
                .then((answers) => {
                  newEmployee.manager = answers.manager;
                  employee.add(
                    newEmployee.firstName,
                    newEmployee.lastName,
                    newEmployee.role,
                    newEmployee.manager
                  );
                  employee.showAll();
                  setTimeout(() => {
                    mainMenuPrompt();
                  }, 50);
                });
            }, 50);
          });
        }, 50);
      });
    }
    if (content == "main") {
      mainMenuPrompt();
    }
  }
  
  function removeRecord() {
    inquirer.prompt(questions.removeMenu).then((answers) => {
      let remove = answers.remove;
      if (remove === "exit") {
        mainMenuPrompt();
      }
      if (remove === "role") {
        role.showAll();
        setTimeout(() => {
          inquirer.prompt(questions.askId).then((answer) => {
            role.remove(answer.id);
            answers = {};
            mainMenuPrompt();
          });
        }, 100);
      }
      if (remove === "department") {
        department.showAll();
        setTimeout(() => {
          inquirer.prompt(questions.askId).then((answer) => {
            department.remove(answer.id);
            answers = {};
            mainMenuPrompt();
          });
        }, 100);
      }
      if (remove === "employee") {
        employee.showAll();
        setTimeout(() => {
          inquirer.prompt(questions.askId).then((answer) => {
            employee.remove(answer.id);
            answers = {};
            mainMenuPrompt();
          });
        }, 100);
      }
    });
  }
  
  function updateRecord(category) {
    if (category === "main") {
      answers = {};
      mainMenuPrompt();
    }
    if (category === "department") {
      department.showAll();
      let newId = "";
      let newName = "";
      setTimeout(() => {
        inquirer.prompt(questions.updateRecord.recordId).then((answers) => {
          newId = answers.id;
          inquirer.prompt(questions.updateRecord.department).then((answers) => {
            newName = answers.newName;
            department.update(newId, newName);
            setTimeout(() => {
              department.showAll(), 150;
            });
            setTimeout(() => {
              answers = {};
              mainMenuPrompt();
            }, 250);
          });
        });
      }, 150);
    }
    if (category === "role") {
      role.showAll();
      let roleId = "";
      setTimeout(() => {
        inquirer.prompt(questions.updateRecord.recordId).then((answers) => {
          roleId = answers.id;
          inquirer.prompt(questions.updateRecord.role).then((answers) => {
            if (answers.role === "main") {
              answers = {};
              mainMenuPrompt();
            }
            if (answers.newSalary) {
              role.updateSalary(roleId, answers.newSalary);
              setTimeout(() => {
                role.showAll();
              }, 150);
              setTimeout(() => {
                mainMenuPrompt();
              }, 250);
            }
            if (answers.newDepartment) {
              role.updateDepartment(roleId, answers.newDepartment);
              setTimeout(() => {
                role.showAll();
              }, 150);
              setTimeout(() => {
                mainMenuPrompt();
              }, 250);
            }
            if (answers.newTitle) {
              role.updateTitle(roleId, answers.newTitle);
              setTimeout(() => {
                role.showAll();
              }, 150);
              setTimeout(() => {
                mainMenuPrompt();
              }, 250);
            }
          });
        });
      }, 50);
    }
    if (category === "employee") {
      employee.showAll();
      let employeeId = "";
      setTimeout(() => {
        inquirer.prompt(questions.updateRecord.recordId).then((answers) => {
          employeeId = answers.id;
          inquirer.prompt(questions.updateRecord.employee).then((answers) => {
            if (answers.employee === "main") {
              answers = {};
              mainMenuPrompt();
            }
            if (answers.newRole) {
              employee.updateRole(employeeId, answers.newSRole);
              setTimeout(() => {
                employee.showAll();
              }, 150);
              setTimeout(() => {
                mainMenuPrompt();
              }, 250);
            }
            if (answers.newManager) {
              employee.updateManager(employeeId, answers.newManager);
              setTimeout(() => {
                employee.showAll();
              }, 150);
              setTimeout(() => {
                mainMenuPrompt();
              }, 250);
            }
          });
        });
      }, 50);
    }
  };


mainMenuPrompt();

