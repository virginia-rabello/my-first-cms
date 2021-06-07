const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, roles.title AS title, roles.salary AS salary, CONCAT(m.first_name,' ',m.last_name) AS manager, departments.name AS department
    FROM employees e
    INNER JOIN roles ON roles.id = e.role_id
    LEFT JOIN employees m ON m.id = e.manager_id
    INNER JOIN departments ON departments.id = roles.department_id
    ORDER BY id;`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

      // Add employee
router.post('/employees', ({ body }, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });

  // Update a employee's role
router.put('/employees/:id', (req, res) => {
    const sql = `UPDATE employees SET role_id = ? 
                 WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  module.exports = router;


