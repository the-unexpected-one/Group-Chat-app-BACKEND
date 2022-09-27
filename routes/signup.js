const path = require('path');

const express = require('express');

const signupController = require('../Controllers/signup');


const router = express.Router();

router.post('/signUp',signupController.postSignUp)


router.post('/login',signupController.login)



module.exports = router
// console.log('hello')
