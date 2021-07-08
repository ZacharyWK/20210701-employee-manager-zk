const connection = require("./config/connection.js")
const inquirer = require("inquirer");


init();
async function init() {
  const { option } = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: ["Add Something", "View Something", "Delete Something", "EXIT"],
  });

  if (option === "Add Something") {
    addEmp();
  } else if (option === "View Something") {
    viewAllEmp();
  } else if (option === "Delete Something") {
    del();
  } else {
    console.log("Good bye!");
    process.exit(0);
  }
}

async function view() {
  const { option } = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "What would you like to View?",
    choices: ["View all Employees", "View an Employee", "View all Role", "EXIT"],
  });

  if (option === "Add Something") {
    addEmp();
  } else if (option === "View Something") {
    view();
  } else if (option === "Delete Something") {
    del();
  } else {
    console.log("Good bye!");
    process.exit(0);
  }
}

async function addEmp() 
{
const role = await connection.query("SELECT rol_id FROM employee_role")
const mngr = await connection.query("SELECT emp_first_name, emp_last_name, emp_id FROM employee WHERE rol_id = 1")

console.log ("mngr", mngr)
const { option } = await inquirer.prompt
([
{
name: "add_emp_ln",
message: "Enter Employee;s Last name.",
default: "Last Name"
},
{
name: "add_emp_fn",
message: "Enter Employee;s First name.",
default: "First Name"
},
{
type: "list",
name: "what_rol",
message: "What is the employees role?",
choices: role,
},
{
  type: "list",
  name: "what_mngr",
  message: "Who is the Employees Manager?",
  choices: mngr.map((item) => ({ value: item.emp_id, name: item.emp_last_name + ", " + item.emp_first_name })),
},
]);

const query = await connection.query
(
'INSERT INTO employee SET ?',
{
  emp_first_name: add_emp_fn,
  emp_last_name: add_emp_ln,
  rol_id: what_rol,
  emp_manager_id:what_mngr
},
)
}


async function viewAllEmp(){
connection.query("SELECT * FROM employee", async function (err, data){
console.table(data); 
init();
}
)
}