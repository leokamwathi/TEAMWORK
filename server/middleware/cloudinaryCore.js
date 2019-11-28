const cloudinary = require('cloudinary').v2;
const express = require('express');
const multer = require('multer');
const path = require('path');
const Datauri = require('datauri')


const Router = express.Router();

cloudinary.config({
    cloud_name:'leokamwathi',
    api_key:'214736252583967',
    api_secret:'G-WysntD9OnML2ASiqzLdso_3KM'
});

Router.post('/', (req, res, next) => {
    if (req.body.isGif && req.body.isGif=='true'){
        if (!req.files) {
            res.status(403).send("No file Selected");
            next(new Error('No file selected'))
        } else if (!/jpeg|jpg|png|gif|bmp/.test(req.files[0].originalname.split('.').reverse()[0].toLowerCase())){
            res.status(403).send("Wrong Image format. Only jpeg,jpg,png,gif and bmp are allowed");
            next(new Error('Wrong Image format'))
        }else{
            const file = req.files[0];
            // console.log(req.file);
            const datauri = new Datauri();
            datauri.format(`.${file.originalname.split('.').reverse()[0]}`, file.buffer);

            cloudinary.uploader.upload(datauri.content).then((result)=>{
                req.body.post = result.url
                next();
            }).catch((error)=>{
                // console.log(error);
                res.status(403).send("Cloudinary Error");
                next(error);
            })
}

        }else{
            next();
        }
  
    
});

module.exports = Router;





