var express = require('express');
var router = express.Router();
var student = require('../models/student')
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
var csv = require('fast-csv')
const upload = multer({ dest: '../uploads/' })

var authorization = require("../middlewares/authorization")


/* GET students */
router.get('/', authorization, student.getStudents);

/* DELETE student */
router.delete('/:id', authorization, student.deleteStudent);

/* UPDATE student */
router.put('/', authorization, student.updateStudent);

/* CREATE student */
router.post('/', authorization, student.createStudent);

// router.post('/file', upload.single('uploadcsv'), student.copyCSV);

router.post('/file', upload.single('uploaded_file'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
 });

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads/')
//     },
//     filename: (req, file, callBack) => {
//         callBack(
//         null,
//         file.fieldname + '-' + Date.now() + path.extname(file.originalname),
//         )
//     }
// })

// var upload = multer({
//     storage: storage,
// })

module.exports = router;
