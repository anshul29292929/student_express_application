const pool = require('pg')

const dotenv = require('dotenv');

dotenv.config({
    path:'../.env'
})


console.log((process.env.dbport))
var config = {
    database: process.env.database,
    host: process.env.host ,
    password: process.env.password,
    port: process.env.dbport,
    user: process.env.user,
};

const client = new pool.Client(config)

client.connect((err, result)=>{
    if(!err){
        console.log('Database connected')
    }
    else{
        console.log('Error in databse connection')
    }
})

module.exports={
    client
}