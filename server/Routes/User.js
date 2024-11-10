




const express = require('express');
const router = express.Router();

const dummyHandler = require('../Controllers/dummy'); 

router.post("/dummyHandling", dummyHandler);

module.exports = router;
