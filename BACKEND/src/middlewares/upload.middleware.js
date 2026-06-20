const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    filesSize: 1024 * 1024 * 20,
  },
});

module.exports=upload