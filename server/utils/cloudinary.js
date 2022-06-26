const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async file => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(file, { folder: 'Devto clone' });
    return uploadedResponse.url;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadToCloudinary };
