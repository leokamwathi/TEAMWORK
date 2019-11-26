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

// const storage = multer.memoryStorage();


// const storage = multer.diskStorage(
//     {
//         destination: './public/uploads/',
//         filename(req, file, cb) {
//             cb(null, `${file.fieldname}-${Date.now()}-image${path.extname(file.originalname)}`)
//         }
//     });



// const filefilter = (req, file, cb) => {
//     // valid extensions

//     const filetypes = /jpeg|jpg|png|gif|bmp/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype);

//     if (extname && mimetype) {
//         return (cb(null, true))
//     }
//     cb('Error: Images Only!!');
// }

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 2000000
//     },
//     fileFilter: filefilter
// }).single('myFile')


Router.post('/', (req, res, next) => {
    console.log("UPLOAD FILE: ", req.body);
    if (req.body.isGif && req.body.isGif=='true'){
        if (!req.files) {
            res.status(403).send("No file Selected");
            next(new Error('No file selected'))
        } else if (!/jpeg|jpg|png|gif|bmp/.test(req.files[0].originalname.split('.').reverse()[0].toLowerCase())){
            res.status(403).send("Wrong Image format. Only jpeg,jpg,png,gif and bmp are allowed");
            next(new Error('Wrong Image format'))
        }else{
        //    console.log("UPLOAD FILE: ", req.file);
            // We are posting a gif- expect a gif  or image of no more that 2 MB
        //     upload(req, res, (err) => {
        // if (err) {
        //     res.status(403).send(`Error uploading file`);
        //     next(err)
        // } else {
            const file = req.files[0];
            // console.log(req.file);
            const datauri = new Datauri();
            datauri.format(`.${file.originalname.split('.').reverse()[0]}`, file.buffer);
            // cloudinary.uploader.upload(datauri.content,(error,result)=>{
            //     if(!error){
            //         console.log(result);
            //         req.body.post = result.url
            //         next();
            //     }
            //     console.log(error);
            //     res.status(403).send("Cloudinary Error");
            //     next(error);
            // })

            cloudinary.uploader.upload(datauri.content).then((result)=>{
                console.log(result);
                req.body.post = result.url
                next();
            }).catch((error)=>{
                console.log(error);
                res.status(403).send("Cloudinary Error");
                next(error);
            })
        // }
    // })
}

        }else{
            next();
        }
  
    
});





module.exports = Router;





