const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"r$$100200",
    database:"crud_app"
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student_data";
    db.query(sql, (err, data) => {
        if(err) return res.json('Something went wrong!');
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql1 = "INSERT INTO student_data (Name, Email) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email
    ]

    db.query(sql1, [values], (err, data) => {
        if(err) return res.json("Something went wrong!");
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql2 = "UPDATE student_data SET Name = ?, Email = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ]

    const id = req.params.id;

    db.query(sql2, [...values, id], (err, data) => {
        if(err) return res.json("Something went wrong!");
        return res.json(data);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql3 = "DELETE FROM student_data WHERE ID = ?";
   
    const id = req.params.id;

    db.query(sql3, [id], (err, data) => {
        if(err) return res.json("Something went wrong!");
        return res.json(data);
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port: http://localhost:${PORT}`);
});

