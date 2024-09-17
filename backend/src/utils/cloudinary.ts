import { v2 as cloudinary } from 'cloudinary';
import CustomError from './CustomError';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploadOnCloudinary(localeFilePath: string) {
  try {
    if (!localeFilePath) throw new CustomError('No File Path provided', 400);
    const response = await cloudinary.uploader.upload(localeFilePath, {
      resource_type: 'auto',
    });
    console.log('File uploaded on cloudinary successfully.');
    fs.unlinkSync(localeFilePath);
    return response.url;
  } catch (err) {
    fs.unlinkSync(localeFilePath);
    throw new CustomError('Error while uploading file to cloudinary.', 500);
  }
}
