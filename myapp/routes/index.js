var express = require('express');
var router = express.Router();

let filedata = require('../controllers/index');

/* GET home page. */

router.get('/',filedata.get_data);

router.post('/',filedata.submit_data);

module.exports = router;
