const path = require('path');

const express = require('express');
const groupController = require('../Controllers/group');

const userauthentication=require('../middleware/auth')
const router = express.Router();

router.post('/creategroup',userauthentication.authenticate,groupController.creategroup);
// router.get('/groupname',groupController.getgroupname)
router.get('/addmember',groupController.addmember)

router.post('/add',groupController.addmembertogroup)

router.get('/groupname',userauthentication.authenticate,groupController.displaygroupnames)

router.get('/getgroupchats/:groupid',userauthentication.authenticate,groupController.getgroupchats)

module.exports=router