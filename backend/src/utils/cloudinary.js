import {v2 as cloudinary} from "cloudinary"
import fs from "fs"//filesystem
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET
    });
    
})();

const uploadoncloudinary= async(localfilepath)=>{
    try {
        if(!localfilepath)return null;
        const response=await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
        console.log("file uploaded successfully",
            response.url
        )
        return response;

    } catch (error) {
        fs.unlinkSync(localfilepath)//remove locally saved temp file as the upload operation get failed
    }
}


  export {uploadoncloudinary}