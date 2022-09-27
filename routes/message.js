const path = require('path');

const express = require('express');

const messageController = require('../Controllers/message');

const userauthentication=require('../middleware/auth')
const router = express.Router();

router.post('/message',userauthentication.authenticate,messageController.postMessages)
router.get('/message',messageController.getMessages)

module.exports = router