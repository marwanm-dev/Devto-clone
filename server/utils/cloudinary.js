const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async file => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(file, { folder: 'Devto clone' });
    return uploadedResponse;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadToCloudinary };
