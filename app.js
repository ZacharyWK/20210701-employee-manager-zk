const connection = require("./config/connection.js");
const inquirer = require("inquirer");

init();
async function init() {
  const { option } = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "Add Something",
      "View Something",
      "Change Something",
      "Delete Something",
      "EXIT",
    ],
  });

  if (option === "Add Something") {
    add();
  } else if (option === "View Something") {
    view();
  } else if (option === "Change Something") {
    change();
  } else if (option === "Delete Something") {
    del();
  } else {
    console.log("Good bye!");
    process.exit(0);
  }
}

//CHOICES FROM INIT
async function add() {
  const { choiceAdd } = await inquirer.prompt({
    type: "list",
    name: "choiceAdd",
    message: "What would you like to Add?",
    choices: ["Add Employee", "Add Department", "Add Role", "Go Back"],
  });
  if (choiceAdd === "Add Employee") {
    addEmp();
  } else if (choiceAdd === "Add Department") {
    addDep();
  } else if (choiceAdd === "Add Role") {
    addRol();
  } else {
    init();
  }
}
async function view() {
  const { choiceView } = await inquirer.prompt({
    type: "list",
    name: "choiceView",
    message: "What would you like to View?",
    choices: ["View Employees", "View Departments", "View Roles", "Go Back"],
  });
  if (choiceView === "View Employees") {
    viewEmp();
  } else if (choiceView === "View Departments") {
    viewDep();
  } else if (choiceView === "View Roles") {
    viewRol();
  } else {
    init();
  }
}
async function change() {
  const { choiceChange } = await inquirer.prompt({
    type: "list",
    name: "choiceChange",
    message: "What would you like to Change?",
    choices: [
      "Change an Employees Manager",
      "Change an Employees Department",
      "Change an Employees Role",
      "Go Back",
    ],
  });
  if (choiceChange === "Change an Employees Manager") {
    changeMan();
  } else if (choiceChange === "Change an Employees Department") {
    changeDep();
  } else if (choiceChange === "Change an Employees Role") {
    changeRol();
  } else {
    init();
  }
}
async function del() {
  const { choiceDelete } = await inquirer.prompt({
    type: "list",
    name: "choiceDelete",
    message: "What would you like to Delete?",
    choices: [
      "Delete a Manager",
      "Delete a Department",
      "Delete a Role",
      "Go Back",
    ],
  });
  if (choiceDelete === "Delete a Manager") {
    deleteMan();
  } else if (choiceDelete === "Delete a Department") {
    deleteDep();
  } else if (choiceDelete === "Delete a Role") {
    deleteRol();
  } else {
    init();
  }
}

//ADD
async function addEmp() {
  const role = await connection.query(
    "SELECT rol_id, rol_title FROM employee_role"
  );
  const mngr = await connection.query(
    "SELECT emp_first_name, emp_last_name, emp_id FROM employee WHERE rol_id = 1"
  );
  console.log(mngr);
  const { option } = await inquirer.prompt([
    {
      name: "add_emp_ln",
      message: "Enter Employee;s Last name.",
      default: "Last Name",
    },
    {
      name: "add_emp_fn",
      message: "Enter Employee;s First name.",
      default: "First Name",
    },
    {
      type: "list",
      name: "what_rol",
      message: "What is the employees role?",
      choices: role.map((item) => ({
        value: item.rol_id,
        name: item.rol_title,
      })),
    },
    {
      type: "list",
      name: "what_mngr",
      message: "Who is the Employees Manager?",
      choices: mngr.map((item) => ({
        value: item.emp_id,
        name: item.emp_last_name + ", " + item.emp_first_name,
      })),
    },
  ]);
  const query = await connection.query("INSERT INTO employee SET ?", {
    emp_first_name: option.add_emp_fn.value,
    emp_last_name: option.add_emp_ln.value,
    rol_id: option.what_rol.value,
    emp_manager_id: option.what_mngr.value,
  });
  await init();
}

async function addDep() {
  const { option } = await inquirer.prompt([
    {
      name: "add_dep_name",
      message: "Enter Departments name.",
      default: "Department",
    },
  ]);
  const query = await connection.query("INSERT INTO department SET ?", {
    dep_name: add_dep_name,
  });
  await init();
}

async function addRol() {
  const department = await connection.query(
    "SELECT dep_id, dep_name FROM department"
  );
  const { option } = await inquirer.prompt([
    {
      name: "add_dep_name",
      message: "Enter Departments name.",
      default: "Department",
    },
    {
      type: "list",
      name: "what_dep",
      message: "What is the employees role?",
      choices: department.map((item) => ({
        value: item.dep_id,
        name: item.dep_name,
      })),
    },
  ]);
  const query = await connection.query("INSERT INTO department SET ?", {
    rol_title: option.add_dep_name,
    rol_salary: option.add_dep_name,
    dep_id: option.what_dep,
  });
  await init();
}

//VIEW
async function viewEmp() {
  connection.query("SELECT * FROM employee", async function (err, data) {
    console.table(data);
    init();
  });
}
async function viewDep() {
  connection.query("SELECT * FROM department", async function (err, data) {
    console.table(data);
    init();
  });
}
async function viewRol() {
  connection.query("SELECT * FROM employee_role", async function (err, data) {
    console.table(data);
    init();
  });
}

//CHANGE <<<<<<WORKING HERE
// function changeRol(){
// const role = connection.query("SELECT rol_id, rol_title FROM employee_role")
// connection.query("SELECT * FROM employee_role", (err, data) =>{
// if (err) throw err;
// inquirer.prompt([
// {
// type: "list",
// name: "id",
// message: "Which employees role is being changed?",
// choices: empName.map((item) => ({ value: item.emp_id, name: item.emp_last_name + ", " + item.emp_first_name}))
// },
// {
// type: "list",
// name: "role_id",
// message: "What role would you like to give the employee?",
// choices: role.map((item) => ({value:item.rol_id, name:item.rol_title}))
// }
// ])
// .then (function(data) {
// connection.query("UPDATE employee WHERE id = ? SET role_id = ?", {
// role_id: data.id
// });
// viewEmp();
// });
// });
// }

async function changeRol() {
  const empName = await connection.query(
    "SELECT emp_first_name, emp_last_name, emp_id FROM employee"
  );
  const role = await connection.query(
    "SELECT rol_id, rol_title FROM employee_role"
  );

  const department = await connection.query(
    "SELECT dep_id, dep_name FROM department"
  );
  const { option } = await inquirer.prompt(
    // UPDATE rol_id SET new_rol_id FROM employee WHERE emp_id = id
    [
      {
        type: "list",
        name: "id",
        message: "Which employees role is being changed?",
        choices: empName.map((item) => ({
          value: item.emp_id,
          name: item.emp_last_name + ", " + item.emp_first_name,
        })),
      },
      {
        type: "list",
        name: "new_role_id",
        message: "What role would you like to give the employee?",
        choices: role.map((item) => ({
          value: item.rol_id,
          name: item.rol_title,
        })),
      },
    ]
  );
  const query = await connection.query("UPDATE employee SET ? WHERE ?", {
    rol_id: option.new_role_id,
    emp_id: option.id,
  });
}

function changeDep() {
  connection.query("SELECT * FROM employee_role", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          message:
            "Enter ID of the employee whose Department you'd like to change.",
          name: "id",
        },
        {
          message: "What is the new Department Id you'd like to give them?",
          name: "_id",
        },
      ])
      .then(function (data) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", {
          role_id: data.id,
        });
        viewEmp();
      });
  });
}
function changeMan() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          message:
            "Enter ID of the employee whose Manager you'd like to change.",
          name: "id",
        },
        {
          message: "What is their new Managers Id?",
          name: "emp_manager_id",
        },
      ])
      .then(function (data) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", {
          role_id: data.id,
        });
        viewEmp();
      });
  });
}

//DELETE
