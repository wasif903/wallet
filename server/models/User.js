import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    OtpCode: {
        type: Number
    },
    OtpExp: {
        type: Number
    },
    role: {
        type: [String],
        enum: ["SuperAdmin", "BrandOwner", "Influencer"],
        default: ["Influencer"],
        require: true
    },
});

export default mongoose.model("users", UserSchema);
