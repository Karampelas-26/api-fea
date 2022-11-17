var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var pool = require('../db/database');

exports.login = async (req, res) => {
    
    const { email, password } = req.body;
    try {
        const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]) //Verifying if the user exists in the database
        const user = data.rows;
        // console.log(user)
        if (user.length === 0) {
            console.log('errrrrr')
            res.status(400).json({error: "User is not registered, Sign Up first"});
        }
        else {
            // console.log(user[0])

            bcrypt.compare(password, user[0].password, (err, result) => { 

                if (err) {
                    
                    res.status(500).json({error: "Server error"});
                } 
                else if (result === true) { 
                    console.log(process.env.SECRET_KEY)
                    const token = jwt.sign({email: email, role: user[0].role}, process.env.SECRET_KEY);
                    console.log(user[0].role)
                    res.status(200).json({ role: user[0].role, token: token});
                }
                else {
                //Declaring the errors
                    if (result != true)
                    res.status(400).json({error: "Enter correct password!"});
                }
            
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Database error occurred while signing in!"});
    };
};
