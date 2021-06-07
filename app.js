 const fs = require('fs');
 const inquirer = require('inquirer');
 const getMethods = require('./routes/appRoutes/fetch');

 const mainMenuOptions = () => {
     
    return inquirer.prompt([ 
        {
         type: 'list',
         name: 'choice',
         message: "What would you like to do?",
         choices: [
             {
                 name:'View all departments',
                 value:0
             }, 
             {
                name:'View all roles',
                value:1
            }, 
            {
                name:'View all employees',
                value:2
            },
            {
                name:'Add a department',
                value:3
            }, 
            {
               name:'Add a role',
               value:4
           }, 
           {
               name:'Add an employee',
               value:5
           },
           {
            name:'Update an employee role',
            value:6
        }, 
        {
            name:'Exit',
            value:7
        }],
         default: 7
        }
        ]);
    };

 const addDepartment = (data) => {
    return inquirer.prompt([ 
        {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new department? (Required)',
        validate: departmentInput =>{
                if (departmentInput){
                    return true;
                }else{
                    console.log('You need to enter the name of the new department!');
                    return false;
                }
            } 
         }
        ]).then(add_to_data => {
            data = add_to_data;
            return data;
        })  
    };

 const addRole = data => {
     return inquirer.prompt([
        {
        type: 'input',
        name: 'title',
        message: 'What is the name of the new role? (Required)',
        validate: roleInput =>{
            if (roleInput){
                return true;
            }else{
                console.log('You need to enter the name of the new role!');
                return false;
            }
        }   
       },
       {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role? (Required)',
        validate: salaryInput =>{
            if (salaryInput){
                return true;
            }else{
                console.log('You need to enter the salary of the new role!');
                return false;
            }
        }   
       },
       {
        type: 'input',
        name: 'department_id',
        message: 'What is the department id of the new role? (Required)',
        validate: idInput =>{
            if (idInput){
                return true;
            }else{
                console.log('You need to enter the department id of the new role!');
                return false;
            }
        }   
       }
    ]).then (add_to_data => {
        data = add_to_data;
        return data;
    })
    };

 const addEmployee = data => {
     
    return inquirer.prompt([
        {
        type: 'input',
        name: 'first_name',
        message: 'What is the first name of the new employee? (Required)',
        validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('You need to enter the first name of the new employee!');
                return false;
            }
        }   
       },
       {
        type: 'input',
        name: 'last_name',
        message: 'What is the last name of the new employee? (Required)',
        validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('You need to enter the last name of the new employee!');
                return false;
            }
        }   
       },
       {
        type: 'input',
        name: 'role_id',
        message: 'What is the id number of the role? (Required)',
        validate: idInput =>{
            if (idInput){
                return true;
            }else{
                console.log('You need to enter the id number of the role!');
                return false;
            }
        }   
       },
       {
        type: 'input',
        name: 'manager_id',
        message: 'What is the id number of the manager? (Required)',
        validate: idInput =>{
            if (idInput){
                return true;
            }else{
                console.log('You need to enter the id number of the manager!');
                return false;
            }
        }   
       }
    ]).then(add_to_data => {
        data = add_to_data;
        return data;
    });
};

const updateEmployee = (data) => {
 
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: "Which employee would you like to update the role?",
            choices: data.employeesArray
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee new role?",
            choices: data.rolesArray
        }
    ]).then(update_data => { 
             return update_data;
       
    });
};

 function init(){
    mainMenuOptions().then
    (answer => {
    if(answer.choice != 7){
        if(answer.choice === 0){
            let data = getMethods.getAll('departments');
            data.then(response =>{
                console.log('\n');
                console.table(response);
            });
          init();
        }
        else if(answer.choice === 1){
            let data = getMethods.getAll('roles');
          data.then(response =>{
              console.log('\n');
              console.table(response);
          });
            init();
        }
        else if(answer.choice === 2){
            let data = getMethods.getAll('employees');
          data.then(response =>{
              console.log('\n');
              console.table(response);
          });
            init();
        }
        else if(answer.choice === 3){
            let data;
           addDepartment(data).then(new_department =>{
                getMethods.addNew(new_department, 'departments');
            }).then(init);
        }
        else if(answer.choice === 4){
            let data;
            addRole(data).then(body =>{
                getMethods.addNew(body, 'roles');
            }).then(init);
        }
        else if(answer.choice === 5){
            let data;
            addEmployee(data).then(body =>{
                getMethods.addNew(body, 'employees');
            }).then(init);
        }
        else if(answer.choice === 6){
            let dataEmp = getMethods.getAll('employees');
            dataEmp.then(response =>{
                let res = {
                    rolesArray:[],
                    employeesArray:[]
                }

              for(let i = 0; i < response.length; i++){
                  let empObj = {
                  name: response[i].first_name.concat(' ', response[i].last_name),
                  value: response[i].id
                  }
                  res.employeesArray.push(empObj);
              }
              return res;
            }).then(response => {
            let dataRole = getMethods.getAll('roles');
            dataRole.then(response => {
                let array = [];
                for(let i=0; i < response.length; i++){
                 let roleObj = {
                     name: response[i].title,
                     value: response[i].id
                 }  
                 array.push(roleObj);
                }
                return array;
            }).then( res => {
                response.rolesArray=res;
                return response;
            }).then(res => {
               updateEmployee(res)
               .then(res => {
                   getMethods.upateEmployeeRole(res.employee, res.role);
               }).then(init);
            });  
        })
        } 
        else {
            return false;
        }    
    }
        else {
            process.exit();
        } 
});
    };

 module.exports = init;


