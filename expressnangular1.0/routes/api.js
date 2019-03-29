const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});
var upload = multer({storage:store}).single('file');
const directoryPath = path.join(__dirname, '../uploads');
route.post('/upload',(req, res, next) => {
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});

route.post('/download',(req, res, next) => {
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);  
});

route.get('/downloadlist',(req,res)=>{
    let fileArry = []; 
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
            fileArry.push({originalname : file}); 
        });
        res.json(fileArry);
    });    
});

route.post('/deleteFile',(req,res) => {
    console.log(req.body.filename);
    var fpath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    console.log(fpath);
    fs.unlink(fpath, (err) => {
        if (err) {
          console.error(err)
          return
        }
    });
    res.json("Success");
});
module.exports = route;