const express = require('express')
const router = express.Router();
const multer = require('multer');
const uploadfile = require('../service/stotage.service')
const upload = multer({storage:multer.memoryStorage()})
const songModel = require('../models/Song.model')


router.post('/songs',upload.single('audio'),async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    // console.log(filedata);
    const filedata = await uploadfile(req.file)
    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:filedata.url,
        mood:req.body.mood,
        album:req.body.album,
    })
    res.status(201).json({
        message:"Songs created succesfully",
        song:song,
    })
})

module.exports = router;