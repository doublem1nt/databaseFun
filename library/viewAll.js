const mysql = require("mysql");
const cTable = require("console.table");

const viewAllEmp = () => {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM role JOIN department ON department.id = role.department_id JOIN employee ON role.id = employee.role_id", (err, res) => {
        if (err) throw err;
        console.log(res);
        // connection.end();
    })
};



module.exports = viewAllEmp;