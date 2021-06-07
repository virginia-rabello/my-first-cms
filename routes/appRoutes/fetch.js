const fetch = require('node-fetch');

  const addNew = (body, address) => {
    fetch(`http://localhost:3001/api/${address}/`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        
    }) .then(response => {
        if (response.ok) {
          return response.json();
        }
        console.log('Error: ' + response.statusText);
      })
      .then(postResponse => {
        console.log(postResponse.message);
        console.log(`Thank you for adding at the ${address} database!`);
      });
  };

const getAll = (adress) => {
  let data =
    fetch(`http://localhost:3001/api/${adress}/`, {
        method: "GET"
    }).then(response => {
      return response.json();
    })
    .then(response => {
        return response.data;
    });
    return data;
}

const upateEmployeeRole = (employee_id, newRole_id) => {
  let body = {
    role_id:newRole_id,
    id:employee_id
  };
    fetch(`http://localhost:3001/api/employees/${employee_id}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
    }).then(res => { 
      if(res.statusText === 'OK'){
      console.log('Thank you for update an employee role.');}
    })
}

module.exports = {
    getAll,
    addNew,
    upateEmployeeRole
}