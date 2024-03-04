import Transaction from "../models/Transaction.js";
import User from "../models/User.js";


const HandlePayToInfluencer = async (req, res) => {
    try {

        const { brandID, influencerID } = req.params;

        const findBrand = await User.findOne({ _id: brandID, role: 'BrandOwner' });

        if (!findBrand) {
            return res.status(404).json({ message: "Invalid Brand ID" })
        }

        const findSuperAdmin = await User.findOne({ role: "SuperAdmin" });
        if (!findSuperAdmin) {
            return res.status(404).json({ message: "Super Admin Doesnt Exists" })
        }

        const findInfluencer = await User.findOne({ _id: influencerID, role: 'Influencer' });
        if (!findInfluencer) {
            return res.status(404).json({ message: "Invalid Influencer ID" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export { HandlePayToInfluencer }