import { v2 as cloudinary } from 'cloudinary';
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config/serverConfig.js';




cloudinary.config({
    api_key:API_KEY,
    api_secret:API_SECRET,
    cloud_name:CLOUD_NAME
});
export const uploadMedia=async(file)=>{
    try {
        const uploadResponse=await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return uploadResponse;
    } catch (error) {
        console.log(error);
    }
}

export const deleteMediaFromCloudinary=async (publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
        
    }
}
export const deleteVedioFromCloudinary=async (publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId,{
            resource_type:"vedio"
        })
    } catch (error) {
        console.log(error);
        
    }
}