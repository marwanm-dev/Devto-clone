const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (file, folder) => {
  const baseURL = 'Devto clone';
  try {
    const uploadedResponse = await cloudinary.uploader.upload(file, {
      folder: `${baseURL}/${folder}`,
    });
    return uploadedResponse;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadToCloudinary };
