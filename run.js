const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require("console.table");

// const iList = require("./inquirerList");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "mocha1Ginger21991!!",
  database: "employee_db"
});

let employeeArr = ["N/A"];

let roleArr = [
  "Administrator",
  "Sales person",
  "Sales Lead",
  "Junior Engineer",
  "Senior Engineer",
  "Finance Associate",
  "Finance Manager",
  "Legal Associate",
  "Head of Legal",
  "Human Resource Associate",
  "Human Resource Manager"
];

let deptArr = [
  "Sales",
  "Engineering",
  "Legal",
  "Finance",
  "HR",
  "Admin"
];

const role_add = [
  {
    type: "list",
    message: "Please specify new ROLE (or Title) to add to the Org: ",
    name: "pushRole",
    choices: roleArr
  },
  {
    type: "input",
    name: "role_salary",
    message: "What is the New Employee's Salary?",
    validate: (value) => {
      let pass = isNaN(value);
      if (!pass) {
        return true;
      }

      return 'Please enter a valid Salary value';
    }
  },
  {
    type: "confirm",
    message: "Are you done adding new Roles?",
    name: "end_newRole"
  }
]


const dept_add = [
  {
    type: "list",
    message: "Please specify new DEPARTMENT to add to the Org: ",
    name: "newDept",
    choices: deptArr
  },
  {
    type: "confirm",
    message: "Are you done adding new Departments?",
    name: "end_newDept"
  }
]

// const remove_dept = [
//   {
//     type: "list",
//     message: "Choose which Department to remove: ",
//     name: "rm_Dept",
//     choices: deptArr
//   }
// ]

const remove_Role = [
  {
    type: "list",
    message: "Choose which Role to remove: ",
    name: "rm_Role",
    choices: roleArr
  }
]

const remove_employee = [
  {
    type: "list",
    message: "Choose which Employee to remove: ",
    name: "rm_Emp",
    choices: employeeArr
  }
]

const viewEmpByDept = [
  // {
  //   type: "list",
  //   message: "Choose which a Department: ",
  //   name: "chosen_Dept",
  //   choices: deptArr
  // }
]

const employee_add = [
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
    message: "Specify a New Employee's ROLE (or title): ",
    name: "newRole",
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
]

const init = () => {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "Remove Department",
        "Remove Role",
        "Remove Employee", 
        // "View All Employees by Department",
        // "View All Employees by Manager",
        "View All Departments",
        "View All Role",
        "View All Employees",
        // "Update Employee Role",
        // "Update Employee Manager",
        "Exit"
      ]
    })
    .then((userInput) => {
      switch (userInput.choice) {
// ----------------------------------------------------------------------------//
      case "Add Department":
        addDept();
        break;
// ----------------------------------------------------------------------------//
      case "Add Role":
        addRole();
        break;
// ----------------------------------------------------------------------------//
      case "Add Employee":
        addEmployee();
        break;
// ----------------------------------------------------------------------------//
      // case "Remove Department":
      //   if (deptArr.length == 0){
      //     console.log("Sorry there are no Departments to remove.");
      //     init()
      //   } else {
      //   removeDept();
      //   }
      //   break;
// ----------------------------------------------------------------------------//
      // case "Remove Role":
      //   if (roleArr.length == 0){
      //     console.log("Sorry there are no Roles to remove.");
      //     init();
      //   } else {
      //   removeRole();
      //   }
      //   break;
// ----------------------------------------------------------------------------//
      case "Remove Employee":

        if (employeeArr.length == 1) {
          console.log("Before you remove an Employee, you must first add Employees.");
          init();
        } else {
          removeEmp();
        }
        break;
// ----------------------------------------------------------------------------//
      case "View All Departments":
        viewAllDept();
        break;
// ----------------------------------------------------------------------------//
      case "View All Role":
        viewAllRoles();
        break;
// ----------------------------------------------------------------------------//
      case "View All Employees":
        viewAllEmp();
        break;
// ----------------------------------------------------------------------------//
      // case "View All Employees by Department":
      //   if (deptArr.length == 0){
      //     console.log("There are no Departments to view")
      //   } else if (employeeArr.length == 1) {
      //     console.log("There are no Employees to view.")
      //   } else {
      //     viewDeptEmp();
      //   }
      //   break;
// ----------------------------------------------------------------------------//
      // case "View All Employees by Manager":
      //   viewEmpMgr();
      //   break;
// ----------------------------------------------------------------------------//
      // case "Update Employee Role":
      //   notfinished();
      //   break;
// ----------------------------------------------------------------------------//
      // case "Update Employee Manager":
      //   notfinished();
      //   break;
// ----------------------------------------------------------------------------//
      case "Exit":
        console.log("Thank you! Good Bye.")
        connection.end();
      break;

      }
    });
}

const addDept = () => {
  inquirer
    .prompt(dept_add)
    .then((data) => {

      const deptAdded = [`${data.newDept}`];
      
      connection.query("INSERT INTO department (name) VALUES (?)", [deptAdded], (err, res) => {
        if (err) throw err;
        console.log(`\n${deptAdded} added into org's Roles. \n`);
        if (!data.end_newDept) {
          addDept();
        } else {
          console.log(`"Adding New Departments" process complete. Thank you.`);
          console.log(`-------------------------------------------------------`);
          init();
        }
      })
    })
}

const addRole = () => {
  inquirer
    .prompt(role_add)
    .then((data) => {
      const newAddedRole = data.pushRole;
      const newRoleSalary = data.role_salary;
      const roleDescript = newAddedRole.split(" ").join("");
      var jobTitle;

      if (roleDescript === "SalesLead" || roleDescript === "Salesperson") {
        jobTitle = "Sales";
        getDepartmentId();
       } else if (roleDescript === "SeniorEngineer" || roleDescript ==="JuniorEngineer"){
          jobTitle = "Engineering";
          getDepartmentId();
       } else if (roleDescript === "HeadofLegal" || roleDescript === "LegalAssociate"){
          jobTitle =  "Legal";
          getDepartmentId()
       } else if (roleDescript === "FinanceManager" || roleDescript=== "FinanceAssociate"){
          jobTitle = "Finance";
          getDepartmentId()
       } else if (roleDescript=== "HumanResourceManager" || roleDescript === "HumanResourceAssociate"){
          jobTitle = "HR";
          getDepartmentId()
       } else if (roleDescript === "Administrator" ){
          jobTitle = "Admin";
          getDepartmentId()
       } 

      var roleId;
      function getDepartmentId() {
        const query = "SELECT id FROM department WHERE name = ?";
        connection.query(query, jobTitle, (err, res) => {
          if (err) throw err;                 
          console.log(res[0].id); 
          roleId = res[0].id;
          roleFinalized();
        });
      };

      function roleFinalized() {
        connection.query("INSERT INTO role (title, salary) VALUES (?, ?)", [newAddedRole, newRoleSalary], (err, res) => {
          if (err) throw err;
          console.log(`\n${newAddedRole} added into org's Roles.\n`);
        });
      };     

      if (!data.end_newRole){
        addRole();
        return;
      } else {
        console.log(`"Adding New Roles" process complete. Thank you.\n`);
        console.log(`-------------------------------------------------`);
        init();
      }
    })
}

const addEmployee = () => {
  inquirer
    .prompt(employee_add)
    .then((data) => {
      var roleId;
      var newEmpRole = data.newRole;
      let newfullName = data.new_Fname + " " + data.new_Lname;

      connection.query("SELECT id FROM role WHERE title = ?", newEmpRole, (err, res) => {
        if (err) throw err;
        console.log(res);
        // roleId = res[0].id;
      });

   
      let newEmpData = [`${data.new_Fname}`, `${data.new_Lname}`, `1`];
      connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", newEmpData, (err, res) => {
        if (err) throw (err);
        console.log(`\n${newfullName} added into org's Employees list.\n`);
        console.log(`---------------------------------------------------`);
        employeeArr.push(newfullName);
        console.log(employeeArr);
        init();
      });
      })

}

// const removeDept = () => {
//   inquirer
//     .prompt(remove_dept)
//     .then((data) => {
//       console.log(data);
//       console.log(data.rm_Dept)
//       let reducedDeptArr = deptArr.filter(dept => dept !== data.rm_Dept);
//       deptArr = reducedDeptArr;

//       console.log(`${data.rm_Dept} will be removed from the Departments list.`);
//       init();      
//     })
// }

// const removeRole = () => {
//   inquirer
//     .prompt(remove_Role)
//     .then((data) => {
//       let reducedRoleArr = roleArr.filter(dept => dept !== data.rm_Role);
//       roleArr = reducedRoleArr;

//       console.log(`${data.rm_Role} will be removed from the Roles list.`);
//       init();      
//     })
// }

const removeEmp = () => {
  inquirer
    .prompt(remove_employee)
    .then((data) => {
      if (data.rm_Emp == "N/A"){
        console.log("Sorry, you cannot remove that Employee from the list. Please choose another.");
        removeEmp();
      } else {
        let reducedEmpArr = employeeArr.filter(Emp => Emp !== data.rm_Emp);
        console.log(reducedEmpArr)
        employeeArr = reducedEmpArr;

        console.log(`${data.rm_Emp} will be removed from the Employees Array.`);
        init();
      }
    })
}

const viewAllDept = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const deptData = res;
    const redesigned = deptData.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
    console.table(redesigned);
  })
  init();
}

// const viewDeptEmp = () => {
//   inquirer
//     .prompt(viewEmpByDept)
//     .then((data) => {
//       connection.query(
//         "SELECT department.name, employee.first_name, employee.last_name, role.title FROM role JOIN department ON department.id = role.department_id JOIN employee ON role.id = employee.role_id WHERE department.name = ?", 
//         [data.chosen_Dept], (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         init();
//       })
//     })
// }



const viewAllRoles = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    const rolesData = res;
    const redesigned = rolesData.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
    console.table(redesigned);
  })
  init();
}


const viewAllEmp = () => {
  // console.log(`Employees in Database: ${employeeArr}`)
  let queryPath = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) ORDER BY employee.id";
  // let queryPath = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM role JOIN department ON department.id = role.department_id JOIN employee ON role.id = employee.role_id ORDER BY employee.role_id";
  connection.query(queryPath, (err, res) => {
    if (err) throw err;
    const viewEmpRes = res;
    const redesigned = viewEmpRes.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
    console.table(redesigned);
    console.log(viewEmpRes);
  })
  // init();
}

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
  // connection.end();
});