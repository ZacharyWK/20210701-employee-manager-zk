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
      "Change a Role's Department",
      "Change an Employees Role",
      "Go Back",
    ],
  });
  if (choiceChange === "Change an Employees Manager") {
    changeMan();
  } else if (choiceChange === "Change a Role's Department") {
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
      "Delete an Employee",
      "Delete a Department",
      "Delete a Role",
      "Go Back",
    ],
  });
  if (choiceDelete === "Delete an Employee") {
    deleteEmp();
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
  const  data  = await inquirer.prompt([
    {
      name: "emp_last_name",
      message: "Enter Employee;s Last name.",
      default: "Last Name",
    },
    {
      name: "emp_first_name",
      message: "Enter Employee;s First name.",
      default: "First Name",
    },
    {
      type: "list",
      name: "rol_id",
      message: "What is the employees role?",
      choices: role.map((item) => ({
        value: item.rol_id,
        name: item.rol_title,
      })),
    },
    {
      type: "list",
      name: "emp_manager_id",
      message: "Who is the Employees Manager?",
      choices: mngr.map((item) => ({
        value: item.emp_id,
        name: item.emp_last_name + ", " + item.emp_first_name,
      })),
    },
  ]);
  if (data !== ""){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",data)
    connection.query("INSERT INTO employee SET ?", {
    emp_first_name: data.emp_first_name,
    emp_last_name: data.emp_last_name,
    rol_id: data.rol_id,
    emp_manager_id: data.emp_manager_id,
  })};
init();
}

async function addDep() {
  const  data  = await inquirer.prompt([
    {
      name: "add_dep_name",
      message: "Enter Departments name.",
      default: "Department",
    },
  ]);
  const query = await connection.query("INSERT INTO department SET ?", {
    dep_name: data.add_dep_name,
  });
init();
}

async function addRol() {
  const department = await connection.query(
    "SELECT dep_id, dep_name FROM department"
  );
  const  data  = await inquirer.prompt([
    {
      name: "add_rol_name",
      message: "Enter Role name.",
      default: "Role Name",
    },
    {
      name: "add_rol_sal",
      message: "Enter Role Salary.",
      default: "50500",
    },
    {
      type: "list",
      name: "what_dep",
      message: "What department is the role for?",
      choices: department.map((item) => ({
        value: item.dep_id,
        name: item.dep_name,
      })),
    },
  ]);
  const query = await connection.query("INSERT INTO employee_role SET ?", {
    rol_title: data.add_rol_name,
    rol_salary: data.add_rol_sal,
    dep_id: data.what_dep,
  });
init();
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

//CHANGE
async function changeRol() {
  const empName = await connection.query(
    "SELECT emp_first_name, emp_last_name, emp_id FROM employee"
  );
  const role = await connection.query(
    "SELECT rol_id, rol_title FROM employee_role"
  );
  const  option  = await inquirer.prompt(
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
  const query = await connection.query("UPDATE employee SET ? WHERE ?",[{rol_id: option.new_role_id},{emp_id: option.id}]);
  await init();
}
async function changeDep() {
  const role = await connection.query(
    "SELECT rol_id, rol_title FROM employee_role"
  );

  const dep = await connection.query(
    "SELECT dep_id, dep_name FROM department"
  );
  const  option  = await inquirer.prompt(
    [
      {
        type: "list",
        name: "id",
        message: "Which Role is being changed?",
        choices: role.map((item) => ({
          value: item.rol_id,
          name: item.rol_title,
        })),
      },
      {
        type: "list",
        name: "new_dep_id",
        message: "What Department should the role be moved too?",
        choices: dep.map((item) => ({
          value: item.dep_id,
          name: item.dep_name,
        })),
      },
      {
        type: "input",
        name: "new_rol_salary",
        message: "Whats the salary for the rol",
        default: "50500"
      },
    ]
  );
  const query = await connection.query("UPDATE employee_role SET ? WHERE ?",[{dep_id: option.new_dep_id, rol_salary: option.new_rol_salary},{rol_id: option.id},]);
  await init();
}


async function changeMan() {
  const empName = await connection.query(
    "SELECT emp_first_name, emp_last_name, emp_id FROM employee"
  );
  const manName = await connection.query(
    "SELECT emp_first_name, emp_last_name, emp_id FROM employee WHERE rol_id = 1"
  );

  const  option  = await inquirer.prompt(
    [
      {
        type: "list",
        name: "id",
        message: "Which employee is being changed?",
        choices: empName.map((item) => ({
          value: item.emp_id,
          name: item.emp_last_name + ", " + item.emp_first_name,
        })),
      },
      {
        type: "list",
        name: "man_id",
        message: "Who is the employees new Manager?",
        choices: manName.map((item) => ({
          value: item.emp_id,
          name: item.emp_last_name + ", " + item.emp_first_name,
        })),
      },
    ]
   );
   const query = await connection.query("UPDATE employee SET ? WHERE ?",[{dep_id: option.new_dep_id, rol_salary: option.new_rol_salary},{rol_id: option.id},]);
   await init();
}

//DELETE
async function deleteEmp() {
  
  const empName = await connection.query(
    "SELECT emp_first_name, emp_last_name, emp_id FROM employee"
  );
  const  option  = await inquirer.prompt(
    [
      {
        type: "list",
        name: "id",
        message: "Which employee is being Deleted?",
        choices: empName.map((item) => ({
          value: item.emp_id,
          name: item.emp_last_name + ", " + item.emp_first_name,
        })),
      },
    ]
  );
  const query = await connection.query("DELETE FROM employee WHERE ?",{emp_id: option.id});
  await init();
}

async function deleteRol() {
 
  const role = await connection.query(
    "SELECT rol_id, rol_title FROM employee_role"
  );

   const  option  = await inquirer.prompt(
     [
       {
         type: "list",
         name: "id",
         message: "Which role is being Deleted?",
         choices: role.map((item) => ({
          value: item.rol_id,
          name: item.rol_title,
         })),
       },
     ]
   );
   const query = await connection.query("DELETE FROM employee_role WHERE ?",{rol_id: option.id});
   await init();
}
 
async function deleteDep() {
 
  const dep = await connection.query(
    "SELECT dep_id, dep_name FROM department"
  );
   const  option  = await inquirer.prompt(
     [
       {
         type: "list",
         name: "id",
         message: "Which department is being Deleted?",
         choices: dep.map((item) => ({
          value: item.dep_id,
          name: item.dep_name,
         })),
       },
     ]
   );
   const query = await connection.query("DELETE FROM department WHERE ?",{dep_id: option.id});
   await init();
}