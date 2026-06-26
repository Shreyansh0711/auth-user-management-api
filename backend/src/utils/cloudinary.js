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
let response;

const uploadoncloudinary= async(localfilepath)=>{
    try {
        if(!localfilepath)return null;
        const response=await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
        // console.log("file uploaded successfully",
        //     response.url
        // )
        fs.unlinkSync(localfilepath)
        return response;

    } catch (error) {
    console.log("Cloudinary Error:", error);

    if(localfilepath){
        fs.unlinkSync(localfilepath);
    }

    return null;
}
}


  export {uploadoncloudinary}