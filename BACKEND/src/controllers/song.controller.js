const songModel = require("../models/song.model");
const storageServices = require("../services/storage.services");
const id3 = require("node-id3");

async function uploadController(req, res) {
  const { mood } = req.body;
  const songBuffer = req.file.buffer;
  const tags = id3.read(songBuffer);
  const [songFile, posterFile] = await Promise.all([
    storageServices.uploadFile({
      buffer: songBuffer,
      fileName: tags.title + "mp3",
      folder: "DHUNIFY/songs",
    }),
    storageServices.uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpeg",
      folder: "DHUNIFY/SONG_POSTER",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "Song added successfully",
  });
}

module.exports = {
  uploadController,
};
