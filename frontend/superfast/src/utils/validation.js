export const validateImage = (imageSize) =>{ 
    const validSize = 2 * 1024 *1024;
    if(imageSize > validSize){
       return "Image size should be less than or equal to 2MB."
    }else{
        return "";
    }
}