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

const init = () => {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        // "Remove Department",
        // "Remove Role",
        // "Remove Employee", 
        // "View All Employees by Department",
        // "View All Employees by Manager",
        "View All Departments",
        "View All Role",
        "View All Employees",
        "Update Employee Role",
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
      // case "Remove Employee":

      //   if (employeeArr.length == 1) {
      //     console.log("Before you remove an Employee, you must first add Employees.");
      //     init();
      //   } else {
      //     removeEmp();
      //   }
      //   break;
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
      case "Update Employee Role":
        updateEmployeeRole();
        break;
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

      var deptID;
      function getDepartmentId() {
        const query = "SELECT id FROM department WHERE name = ?";
        connection.query(query, jobTitle, (err, res) => {
          if (err) throw err;                 
          console.log(`response is ${res[0].id}`); 
          deptID = res[0].id;
          builtRole();
        });
      }

      function builtRole() {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [newAddedRole, newRoleSalary, deptID
        ], (err, res) => {
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
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;

    var rolesList = [];
      for (var i = 0; i< res.length; i++){
      rolesList.push(res[i].title);
    }

    inquirer
      .prompt([
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
          name: "newRole",
          choices: rolesList
        },
        {
          type: "confirm",
          message: "Are you done adding new Employees?",
          name: "end_newEmp",
        }
    ])
    .then((data) => {
      let newEmpRole = data.newRole;
      let newfullName = data.new_Fname + " " + data.new_Lname;
      var roleId = [];

      connection.query("SELECT id FROM role WHERE title = ?", `${newEmpRole}`, (err, res) => {
        if (err) throw err;
        console.log(`roleid equals ${res[0].id}`);
        roleId.push(res[0].id);
        
      
        var newEmpData = [`${data.new_Fname}`, `${data.new_Lname}`, roleId];
        console.log(newEmpData)
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, 1)", newEmpData, (err, res) => {
          if (err) throw (err);
          console.log(`\n${newfullName} added into org's Employees list.\n`);
          console.log(`---------------------------------------------------`);
        })

      });
      if (!data.end_newEmp){
        addEmployee();
      } else {
        console.log(`"Adding New Employees" process complete. Thank you.\n`);
        console.log(`-------------------------------------------------`);
        init();
      }
    })
  })
}

const viewAllRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    const rolesData = res;
    const rolesDisplay = rolesData.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
    console.log("-------------------------------------");
    console.table(rolesDisplay);
    init();
  })
}

const viewAllDept = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const deptData = res;
    const deptDisplay = deptData.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
    console.log("-------------------------------------");
    console.table(deptDisplay);
    init();
  })
}

const viewAllEmp = () => {
  let queryPath = "";
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee JOIN role ON (employee.role_id = role.id) JOIN department ON (role.department_id = department.id) ORDER BY employee.id", 
    (err, res) => {
    if (err) throw err;
    const empDisplay = res.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
    console.log("-------------------------------------");
    console.table(empDisplay);
  })
  init();
}


const updateEmployeeRole = () => {
  // get list of current employees from SQL database 
  connection.query("SELECT first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    var list_employees = [];
    for (var i = 0; i <res.length; i++) {
      // seperate variable for first name and last name //
      const fname = res[i].first_name;
      const lname = res[i].last_name;
      // display full name in prompt
      list_employees.push(fname + "," + lname);
      }
  // get list of existing roles from SQL database 
  connection.query("SELECT title FROM role", (err, res2) => {
    if (err) throw err;
    var roles = [];
    for (var i = 0; i <res2.length; i++) {
    roles.push(res2[i].title);
    }
    roles.push("Create New Role");

    inquirer
      .prompt([{
            name: "employee2Update",
            type: "list",
            message: "Please specify which Employee needs their role updated: ",
            choices: list_employees
        },{
          name: "role",
          type: "list",
          message: "what is his/her new Role?",
          choices: roles
        }
        
      ])
    .then(function(data) {
      if (data.role === "Create New Role"){
        console.log("Add role into Org's please.")
        addRole();
        } else {
          pullRoleId();
        } 


      const selectedEmp = (data.employee2Update).split(",");
      function pullRoleId(){
        const query = "SELECT id FROM role WHERE title = ?";
        connection.query(query, data.role, (err, res) => {
          var roleId;
            if (err) throw err;  
            roleId = res[0].id
              const reviseRole = () => {
                const query = "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";
                connection.query(query,[ roleId , selectedEmp[0] , selectedEmp[1]], (err, res) => {
                  if (err) throw "err";
                  console.log(`Role of ${data.employee2Update} has been updated Sucessfully`)
                  init();
                });
                init();
              };
            reviseRole()
        });
      }   
    });
  });  
})};

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
});