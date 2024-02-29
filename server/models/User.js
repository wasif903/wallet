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
        enum: ["Admin", "User", "Partnerhip"],
        default: ["User"],
        require: true
    },
});

export default mongoose.model("users", UserSchema);
