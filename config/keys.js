const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "smartempo",
  api_key: "724755979274885",
  api_secret: "4WnCV3tRiHeMpMZR1JouM-bjkn0"
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png", "zip", "rar"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

module.exports = {
  mongoURI: "mongodb://admin:admin123@ds113853.mlab.com:13853/sd2",
  fileParser: multer({ storage: storage })
};
