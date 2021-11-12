const express = require('express');
const router = express.Router();

const bookController = require('../controllers/addbook');
router.post('/addbook',bookController.books)
 






module.exports= router;