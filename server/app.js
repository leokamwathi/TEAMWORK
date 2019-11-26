
const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');
const apiRoutes = require('./routes/apiRoute');

// const cloudinaryCore = require('./middleware/cloudinaryCore')
 
const storage = multer.memoryStorage();
const upload = multer({ storage }); // .single('myFile');

const app = express();

// let contentType = ''

app.use(
    (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        
        // req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTU3NDM0NzM1NywiZXhwIjoxNTc0NDMzNzU3fQ.A3uEdaA2ZGh8mW4er9_tM3TqkqDW-UVbjk9PmTbZKJY 8'

        // contentType = req.headers
        // console.log(req.headers['content-type']);
        next();
    });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// app.post('/api/', upload.any());

app.use('/', upload.any(), (req, res, next) => {
    console.log(req.files, req.body);
    // res.status(200).send("test");
    next();
});

app.use('/upload', (req, res, next) => {
    console.log(req.files, req.body);
    res.status(200).send("test");
    next();
})

app.use(express.static('./public')) 

// app.post('/api/', (req, res, next) => {
//  console.log(req);   
// });

/*
(req, res, next) => {
    req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTU3NDM0NzM1NywiZXhwIjoxNTc0NDMzNzU3fQ.A3uEdaA2ZGh8mW4er9_tM3TqkqDW-UVbjk9PmTbZKJY 8'
    console.log("REQUEST>>>>>>:",
    req.body,
    req.params,
    req.headers
    );
    next(); },
*/

  




/*
app.post('/upload/',(req,res)=>{
    // console.log("UPLOAD: ",req,res);
    upload(req,res,(err) =>{
        if(err){
            console.log(req);
            console.log(err);
            res.status(401).send(`error${Date.now()}`);
        }else if(!req.file){
                res.status(401).send("No file Selected");    
        }else{
            console.log(req.file);
            res.status(200).send(`Image File: uploads/${req.file.filename}`);
        }
    })  
});




single('myFile')
*/


// app.use('/upload', (req, res, next) => {
//     let isError = false
//     upload(req, res, (er) => {
//         if(er){
//            console.log(er);
//            isError = true 
//         }else{
//             console.log(req.file, req.body);
//         }
//         next();
//     })


//     res.status(200).send("test");
// }, (req, res, next) => {
//         console.log(req.file, req.body);
    
// });

// , (req, res) => {  //
    // console.log("UPLOAD USE: ", req, res);
    // upload(req, res, (err) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(200).send("error");
    //     } else {
    //         console.log(req.file);
    //         res.status(200).send("test");
    //     }
    // })
// });


app.get("/", (req, res) => {
    res.status(200).send("Welcome to Teamwork frontend");
});



app.use('/api/',apiRoutes);
// upload.single('myFile'),


module.exports = app;