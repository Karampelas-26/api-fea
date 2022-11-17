var express = require('express');
var router = express.Router();
var cors = require('cors')

var {login} = require("../controllers/login");
var {register} = require("../controllers/register");
var {registeradmin} = require("../controllers/register_admin");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', register);

router.post('/registeradmin', registeradmin);

router.post('/login', cors(), login);


module.exports = router;
