var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var pool = require('../db/database');

exports.register = async (req, res) => {

    const { room, email, password } = req.body;

    try {
        const data = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        const arr = data.rows;
        
        if (arr.length != 0) {
            return res.status(400).json({
                error: 'Email already there, no need to register agian.'
            });
        } 
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) {
                    res.status(err).json({
                        error: 'Server error'
                    });
                }
                
                const user = {
                    room,
                    email,
                    password: hash
                };

                var flag = 1;
                
                pool.query(`INSERT INTO users (room, email, password) VALUES ($1, $2, $3)`, [user.room, user.email, user.password], (err) => {
                    if(err) {
                        flag = 0;
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        });
                    }
                    else {
                        flag = 1;
                        res.status(200).send({message: "User added to database, not verified"});
                    }
                });
                
                if (flag) {
                    const token = jwt.sign({email: user.email, role: "ROLE_USER"}, process.env.SECRET_KEY);
                }
            });

        }



    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: "Database error while registring user!"});
    };


}

