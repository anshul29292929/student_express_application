const {client} = require('../db/db.js')
let fs = require('fs')



async function filecreated (y){

    let filename = `./uploads/files/` + y.studentid
    let response = '';
    for (let keys in y){

        response+= keys + " : " + y[keys]+'\n';

    }
    fs.writeFile(filename,response,(err)=>{
        if (err){
            return "error"
        }
        else{
            return null
        }
    } )
}

const filldetails = async (req,res)=>{
    
    try {
        let x = req.body
        if (x.maths<10 || x.physics<10 || x.english<10 || x.hindi<10 || x.chemistry<10){
            return res.status(400).send({Alert:'marks should be a number greater than or equal to 10'})
        }
        if (x.maths>100 || x.physics>100 || x.english>100 || x.hindi>100 || x.chemistry>100){
            return res.status(400).send({Alert:'marks should be a number less than or equal to 100'})
        }
        let insertquery = `INSERT INTO student (student_id, student_name, hindi, english , maths, physics, chemistry) VALUES ($1, $2, $3, $4, $5, $6, $7)`
        let data = [x.studentid, x.studentname, x.hindi, x.english, x.maths, x.physics, x.chemistry]
        const result = await client.query(insertquery,data) 
        if(result.rowCount===1){
            res.status(201).send({msg:"Data inserted successfully"});
        }
    } catch (error) {
        res.status(500).send(error.detail);
    }
}


const getstudentdetails = async (req, res)=>{
    let x= req.body || req.query
    console.log(x)
    if (!x.studentid){
        return res.status(400).send(`Please enter Valid Student ID`)
    }
    try {
        let getquery = `select * from student where student_id = $1`
        let data = [x.studentid]
        let result= await client.query(getquery,data);
        let y =result.rows[0]
        if(!y){
            res.status(400).send("Record Not Found")
        }
        else{
            let totalmarks = y.hindi + y.english + y.chemistry+ y.maths + y.physics
            let sendresponse = {
            studentid : y.student_id,
            studentname : y.student_name,
            total_marks : totalmarks

        }
        res.status(200).send(sendresponse)
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
}

const tocheckresult = async (req,res)=>{
    let x= req.body;
    if (!x.studentid){
        return res.status(400).send(`Please enter Valid Student ID`)
    }
    try {
        let getquery = `select * from student where student_id = $1`
        let data = [x.studentid]
        let result= await client.query(getquery,data);
        let y =result.rows[0]
        if(!y){
            res.status(400).send("Record Not Found")
        }
        else{
            let totalmarks = (y.hindi + y.english + y.chemistry+ y.maths + y.physics)
            let studentResult= ""
            if (totalmarks/5 >=33){
                studentResult="Pass";
            }
            else{
                studentResult="Fail";
            }
            let sendresponse = {
            studentid : y.student_id,
            studentname : y.student_name,
            hindi : y.hindi,
            english : y.english,
            maths :y.maths,
            physics:y.physics,
            chemistry:y.chemistry,
            total_marks : totalmarks,
            percentage: totalmarks/5,
            status : studentResult

        }
        res.status(200).send(sendresponse)
        }
        
    } catch (error) {
        res.status(400).send(error)
    }

}

const createfile = async (req,res)=>{
    let x= req.body;
    if (!x.studentid){
        return res.status(400).send(`Please enter Valid Student ID`)
    }
    try {
        let getquery = `select * from student where student_id = $1`
        let data = [x.studentid]
        let result= await client.query(getquery,data);
        let y =result.rows[0]
        if(!y){
            res.status(400).send("Record Not Found")
        }
        else{
            let totalmarks = (y.hindi + y.english + y.chemistry+ y.maths + y.physics)
            let studentResult= ""
            if (totalmarks/5 >=33){
                studentResult="Pass";
            }
            else{
                studentResult="Fail";
            }
            let sendresponse = {
            studentid : y.student_id,
            studentname : y.student_name,
            hindi : y.hindi,
            english : y.english,
            maths :y.maths,
            physics:y.physics,
            chemistry:y.chemistry,
            total_marks : totalmarks,
            percentage: totalmarks/5,
            status : studentResult
        }
        
        let myresponse = await filecreated(sendresponse);
        if (myresponse==="error"){
            res.status(500).send({message:'Failed to create file'})
        }
        else{
            res.status(200).send({message:'File Created'})
        }
    }
        
    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports={
    filldetails,
    getstudentdetails,
    tocheckresult,
    createfile
}