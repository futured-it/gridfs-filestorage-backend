// Libs imports
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
require('dotenv').config();

// Basic settings
const port = process.env.PORT
const mongodbUrl = process.env.MONGODB_URL

// Express setting up
const app = express()

// MongoDB + GridFS setting up
const dbc = mongoose.createConnection(mongodbUrl);
var gfs, gridfsBucket;
dbc.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(dbc.db, {
        bucketName: "storage"
    });
    gfs = Grid(dbc.db, mongoose.mongo); 
    gfs.collection("storage");
});

// GridFS file storage code
const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = uuidv4() + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: "storage"
            };
            resolve(fileInfo);
        });
    }
});
const addfile = multer({ storage });

// Express request handle code
app.get("/", (req, res) => { // Hello world... No, just Hello!
    res.send('Hello!')
})

app.get("/form", (req, res) => { // Basic file add form
    res.send(
        'Add your file <br> <form method="post" action="/addfile" enctype="multipart/form-data"> <input type="file" id="file" name="file"> <br> <input type="submit"> </form>'
    )
})

app.post("/addfile", addfile.single("file"), (req, res) => { // File add post request handling
    console.log("New add file request incoming!")
});

app.get("/fileslist", (req, res) => { // Files listing
    gfs.files.find().toArray((err, files) => {
        // Files checker
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'File not found'
            });
        }

        return res.json(files);
    });
})

app.get("/getfile/:filename", (req, res) => { // File downloader
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // File checker
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'File not found'
            });
        }

        let readstream = gridfsBucket.openDownloadStreamByName(file.filename);
        readstream.pipe(res);
    });
})

app.listen(port, () => {
    console.log(`Server is alive on ${port} port.`)
})