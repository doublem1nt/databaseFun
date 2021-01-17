const role_questions = [
    {
      type: "input",
      message: "Enter name of new ROLE (or title) for your organization: ",
      name: "newRole"
    },
    {
      type: "confirm",
      message: "Are you done adding new Roles?",
      name: "end_newRole"
    }
];
  
const dept_questions = [
    {
      type: "input",
      message: "Enter name of new DEPARTMENT for your organization: ",
      name: "newDept"
    },
    {
      type: "confirm",
      message: "Are you done adding new Roles?",
      name: "end_newDept"
    }
];
  
const employee_questions = [
    {
      type: "input",
      message: "Enter the FIRST NAME of the New Employee: ",
      name: "new_Fname",
    },
    {
      type: "input",
      message: "Enter the LAST NAME of the New Employee: ",
      name: "new_Lname",
    },
    {
      type: "list",
      message: "Please specify the ROLE of the New Employee: ",
      name: "new_assignedRole",
      choices: roleArr,
    },
    {
      type: "list",
      message: "Please specify the employee's Manager: ",
      name: "new_assignedManager",
      choices: employeeArr,
    },
    {
      type: "confirm",
      message: "Are you done adding new Employees?",
      name: "end_newEmp",
    }
];

module.exports = {
    role_questions, 
    dept_questions, 
    employee_questions
} 