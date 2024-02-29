import Post from "../models/Post.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";


const HandleCreatePost = async (req, res) => {
    try {

        const { userID, content } = req.body;

        const userExist = await User.findById(userID);
        if (!userExist) {
            return res.status(404).json({ message: "User Doesn't Exist" })
        }

        const videoUrl = req.files && req.files.vidUrl;
        const imgUrls = req.files && req.files.imageURLs;

        if (imgUrls && content && !videoUrl) {
            const imageUrls = [];
            if (Array.isArray(imgUrls)) {
                for (const image of imgUrls) {
                    const uploadResult = await cloudinary.uploader.upload(
                        image?.tempFilePath
                    );
                    imageUrls.push(uploadResult.secure_url);
                }
            } else if (imgUrls) {
                const uploadResult = await cloudinary.uploader.upload(
                    imgUrls?.tempFilePath, {
                    folder: "post_images",
                    resource_type: "image",
                }
                );
                imageUrls.push(uploadResult.secure_url);
            }

            const createPost = new Post({
                userID: userExist._id,
                imageURLs: imageUrls,
                content: req.body.content,
                postCategories: req.body.postCategories
            });
            const savePost = await createPost.save();
            res.status(200).json({ savePost, message: "Image Post" });
        } else if (videoUrl && content && !imgUrls) {
            const uploadResult = await cloudinary.uploader.upload(videoUrl.tempFilePath, {
                resource_type: 'video',
                folder: "post_videos",
            })
            const createPost = new Post({
                content: req.body.content,
                userID: userExist._id,
                vidUrl: uploadResult.secure_url,
                postCategories: req.body.postCategories
            });

            const savePost = await createPost.save();
            res.status(200).json({ savePost, message: "Video Post" });
        } else if (!videoUrl && !imgUrls && content) {

            const createPost = new Post({
                content: req.body.content,
                userID: userExist._id,
                postCategories: req.body.postCategories,
            });

            const savePost = await createPost.save();
            res.status(200).json({ savePost, message: "Content Post" });
        } else {
            res.status(400).json({ message: "Invalid Data Try Again" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const HandleGetPosts = async (req, res) => {
    try {
        const postsPerPage = 10;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * postsPerPage;
        const paginatedPosts = await Post.find()
            .populate({
                model: "users",
                path: "userID",
                select: "-password"
            })
            .skip(startIndex)
            .limit(postsPerPage);

        res.status(200).json(paginatedPosts);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export { HandleCreatePost, HandleGetPosts }