const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (file, folder) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(file, {
      folder: `DevToClone/${folder}`,
    });
    return uploadedResponse;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadToCloudinary };
