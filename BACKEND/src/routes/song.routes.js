const express = require('express')
const {uploadController} = require("../controllers/song.controller")
const identifyUser = require('../middlewares/post.middleware')
const upload=require('../middlewares/upload.middleware')

const songRouter = express.Router()

/**
 * POST /api/song
 */
songRouter.post("/upload",identifyUser,upload.single("song"), uploadController)

module.exports = songRouter