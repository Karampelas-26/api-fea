const pool = require('../db/database')
var multer = require('multer');
var fs = require('fs');
var csv = require('fast-csv')

const getStudents = (req, res) => {
    pool.query(`SELECT * FROM students`, (error, results) => {
        if(error) {
            throw error;
        }

        res.send(results.rows);
    })
}

const deleteStudent = (req, res) => {

    const id = req.params.id;

    console.log(id)

    pool.query(`DELETE FROM students WHERE id = '${id}'`, (error, results) => {
        if(error) {
            throw error;
        }
        res.status(200).send(`Student deleted with ID: ${id}`)
    })
}

const updateStudent = (req, res) => {

    const student = req.body;

    const  {id, firstname, lastname, email, room, university, phone, am, dateuniversity, datedorm, comments } = req.body;
    console.log(student);

    pool.query(`UPDATE students SET id = $1, firstname = $2, lastname = $3, email = $4, room = $5, university = $6, phone = $7, am = $8, dateuniversity = $9, datedorm = $10, comments = $11
                WHERE id = '${id}'`, [id, firstname, lastname, email, room, university, phone, am, dateuniversity, datedorm, comments], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Student modified with ID: ${id}`)
    })

}

const createStudent = (req, res) => {
    const student = req.body;
    console.log(student);

    const  {id, firstname, lastname, email, room, university, phone, am, dateuniversity, datedorm, comments } = req.body;

    pool.query(`INSERT INTO students (id, firstname, lastname, email, room, university, phone, am, dateuniversity, datedorm, comments) 
                VALUES ($1, $2, $3, $4, $5 ,$6 ,$7 ,$8 ,$9 , $10, $11) ON CONFLICT (ID) DO NOTHING`, [id, firstname, lastname, email, room, university, phone, am, dateuniversity, datedorm, comments], (error, results) => {
        if (error) {
          throw error
        }
        if (results.rowCount == 1) {
            res.status(201).send(`Student added with ID: ${id}`)
        }
        else {
            res.status(200).send(`Student with id: ${id}, already exists`)
        }
    })

}

const copyCSV = (req, res) => {
    
    console.log('he')

    let stream = fs.createReadStream(__dirname + '/uploads/' + req.file.filename);
    let file = __dirname + '/uploads/' + req.file.filename

    console.log(file)
    console.log(stream)

    // pool.query(`COPY students(id,firstname,lastname,email,room,university,am,dateuniversity,datedorm,phone,comments)
    //             FROM ${file}
    //             DELIMITER ','
    //             CSV HEADER;`, [id, firstname, lastname, email, room, university, phone, am, dateuniversity, datedorm, comments], (error, results) => {
    //     if (error) {
    //       throw error
    //     }
    //     if (results.rowCount > 1) {
    //         res.status(201).send(`Students added`)
    //     }
    //     else {
    //         res.status(200).send(`User with id: ${id}, already exists`)
    //     }
    // })

}

module.exports = {
    getStudents,
    deleteStudent,
    updateStudent,
    createStudent,
    copyCSV
};