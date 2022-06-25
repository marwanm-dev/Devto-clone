const cloudinary = require('../config/cloudinary');

const DatauriParser = require('datauri/parser');
const path = require('path');
const parser = new DatauriParser();

const uploadToCloudinary = async file => {
  try {
    const extName = path.extname(file.originalname).toString();
    const file64 = parser.format(extName, file.buffer);

    const uploadedResponse = await cloudinary.uploader.upload(file64.content);
    console.log({ extName, file64, uploadedResponse });

    return uploadedResponse.url;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadToCloudinary };
