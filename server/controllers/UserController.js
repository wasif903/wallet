import UserSchema from "../models/User.js";
import jwt from "jsonwebtoken"
import autoMailer from "../utils/AutoMailer.js";

const HandleUserRegister = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const checkuser = await UserSchema.findOne({ email: email });
        if (checkuser) {
            res.status(400).json({ message: "User Already exists!" })
        } else {
            const create_user = UserSchema({
                name: name,
                email: email,
                password: password,
                role: role
            });
            const user_save = await create_user.save();

            const token = jwt.sign({
                _id: user_save._id,
                email: user_save.email,
                password: user_save.password,
                role: user_save.role
            }, process.env.JWT_SECRET_KEY)

            res.cookie("cookie", token, { httpOnly: true });

            res
                .status(200)
                .json({ message: "Registered Successfully", status: 200, cookie: token, user: user_save });

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server Error!" })
    }
}


const handleLoginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const findUser = await UserSchema.findOne({ email: email })
        if (!findUser) {
            return res.status(404).json({ message: "Invalid Email or Password" })
        }
        if (findUser.email.toString() === email && findUser.password === password.toString()) {

            // const token = jwt.sign({
            //     email: findUser.email,
            //     password: findUser.password,
            //     role: findUser.role
            // }, process.env.JWT_SECRET_KEY)
            const token = {
                _id: findUser._id,
                email: findUser.email,
                password: findUser.password,
                role: findUser.role
            }

            res.cookie("cookie", token, { httpOnly: true });

            res
                .status(200)
                .json({ message: "Logged In Successfully", status: 200, cookie: token, user: findUser });

        } else {
            res.status(400).json({ message: "Invalid Email or Password" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const findUser = await UserSchema.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ message: "Sorry, Account With This Email Doesn't Exists" })
        }

        const otpCode = await Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const getOtpCode = otpCode;
        const getOtpExpire = Date.now() + 600000;

        findUser.OtpCode = getOtpCode || findUser.OtpCode
        findUser.OtpExp = getOtpExpire || findUser.OtpExp

        await findUser.save();

        autoMailer(
            {
                to: findUser.email,
                subject: 'OTP VERIFICATION CODE',
                message: `<h3>Your OTP Verification Code Is: </h3>
                <h3> ${findUser.OtpCode}</h4>`
            }
        );

        res.status(200).json({ message: "OTP Sent To Your Email" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const handleVerifyOtp = async (req, res) => {
    try {
        const { email, OtpCode } = req.body;
        const findUser = await UserSchema.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ message: "Sorry, We couldn't send your OTP Verification Code" });
        }
        if (OtpCode === "") {
            return res.status(404).json({ message: "OTP Field Is Required" })
        }
        if (findUser.OtpCode !== OtpCode) {
            return res.status(404).json({ message: "Invalid OTP Verification Code" })
        }
        if (findUser.OtpExp && findUser.OtpExp > new Date()) {
            return res.status(200).json({ message: "OTP Verified Successfully" })
        } else {
            return res.status(404).json({ message: "OTP has expired or is invalid" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const handleResetPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const findUser = await UserSchema.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ message: "Sorry, Some Error Occured While Resetting Password" })
        }
        if (password !== confirmPassword) {
            return res.status(404).json({ message: "Passwords Must Be Same" });
        }
        findUser.password = password || findUser.password
        await findUser.save();
        res.status(200).json({ message: "Password Reset Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const handleResendOtp = async (req, res) => {
    try {

        const { email } = req.body;

        const userExists = await UserSchema.findOne({ email });
        if (!userExists) {
            return res.status(404).json({ message: "This Email Doesn't Exist" });
        }

        const otpCode = await Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const getOtpCode = otpCode;
        const getOtpExpire = Date.now() + 600000;

        userExists.OtpCode = getOtpCode || userExists.OtpCode
        userExists.OtpExp = getOtpExpire || userExists.OtpExp

        await userExists.save();

        autoMailer(
            {
                to: userExists.email,
                subject: 'OTP VERIFICATION CODE',
                message: `<h3>Your OTP Verification Code Is: </h3>
                <h3> ${userExists.OtpCode}</h4>`
            }
        );

        res.status(200).json({ message: "OTP Re-Sent Successfully To Your Email" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export {
    HandleUserRegister,
    handleLoginUser,
    handleForgotPassword,
    handleVerifyOtp,
    handleResetPassword,
    handleResendOtp
};