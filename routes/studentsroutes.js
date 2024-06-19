const express = require('express')
const {filldetails, getstudentdetails, tocheckresult, createfile} = require('../controllers/studentcontrollers.js');
const { upload } = require('../middlwares/middlewares.js');
const route = express.Router();

const upload1 = upload.single('file');

route.post('/insertdata',filldetails)
route.get('/getdata', getstudentdetails)
route.get('/result', tocheckresult)
route.post('/fileupload', upload1, filldetails)
route.get('/createfile',createfile)

module.exports=route