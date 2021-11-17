const express = require('express');
const router = express.Router();

const locationController = require('../controllers/updatelocation');


router.get('/booklocation/updatelocation/:id',locationController.booklocation);

router.post('/booklocation/updatelocation/:id',locationController.updatebooklocation)
//router.post('/login',authController.login)





module.exports= router;