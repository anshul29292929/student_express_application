const express = require('express')
const dotenv = require('dotenv')
const bodyParser= require('body-parser')

const userrouter = require('./routes/studentsroutes.js')


dotenv.config()
const app = express();


port = process.env.PORT;
console.log(port);

app.use(bodyParser.json());
app.use('/student',userrouter);
app.use('/', (req, res)=>{
    res.send('Server is listening')
})


app.listen(port, ()=>{
    console.log("server is listening on port = ", port)
})