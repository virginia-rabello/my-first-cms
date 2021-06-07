const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

  // Get all roles
  router.get('/roles', (req, res) => {
    const sql = `SELECT roles.id AS id, roles.title AS title, roles.salary AS salary, departments.name as departments
    FROM roles
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

    // Create a role
router.post('/roles', ({ body }, res) => {

    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];
  
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

  module.exports = router;