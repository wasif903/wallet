import PostCategories from "../models/PostCategories.js";
import { v2 as cloudinary } from "cloudinary";

const HandlePostCategory = async (req, res) => {
    try {
        const { userID, categoryName } = req.body;
        const isAlreadyExists = await PostCategories.findOne({ categoryName });
        if (isAlreadyExists) {
            return res.status(404).json({ message: "This Category Already Exists" });
        }
        const categoryImgUpload = req.files && req.files.categoryImg;
        const uploadResult = await cloudinary.uploader.upload(categoryImgUpload.tempFilePath, {
            folder: "post_categories",
        })
        const createCategory = new PostCategories({
            userID,
            categoryName,
            categoryImg: uploadResult.secure_url
        })
        await createCategory.save();
        res.status(200).json({ message: "Category Created Successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const HandleGetPostCategories = async (req, res) => {
    try {
        const getCategory = await PostCategories.find().populate({
            model: 'users',
            path: 'userID',
        });
        res.status(200).json({ postCatList: getCategory });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export { HandlePostCategory, HandleGetPostCategories }