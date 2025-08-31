import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadImageOnCloudinary = async (image) => {
    try {
        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());
        
        const uploadImage = await new Promise((resolve, reject) => {
            cloudinary.uploader
            .upload_stream({ folder: "superImage" }, (error, uploadResult) => {
                return resolve(uploadResult);
            })
            .end(buffer);
        });
        
        return uploadImage;
    } catch (error) {
        throw new Error("Failed to upload image to Cloudinary");
    }
};
