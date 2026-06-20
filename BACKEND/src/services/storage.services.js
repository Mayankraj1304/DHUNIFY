const ImageKit = require("@imagekit/nodejs").default;

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT,
});

async function uploadFile({ buffer, fileName, folder = "" }) {
  const file = await client.files.upload({
    file: await ImageKit.toFile(Buffer.from(buffer)),
    fileName,
  });
  return file;
}

module.exports = { uploadFile };
