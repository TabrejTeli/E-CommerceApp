import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, role } = req.body;
        if (!name) {
            return res.send({ message: "name is required" })
        }
        if (!password) {
            return res.send({ message: "password is required" })
        }
        if (!email) {
            return res.send({ message: "email is required" })
        }
        if (!phone) {
            return res.send({ message: "phone is required" })
        }
        if (!address) {
            return res.send({ message: "address is required" })
        }

        //check user
        const existingUser = await userModel.findOne({ email })

        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered please login"
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);

        //save 
        const user = await new userModel({ name, email, phone, address, role, password: hashedPassword }).save()
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation 
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        // check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User is not registered"
            })
        }

        if (!email) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: "Login successfull",
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}

export const testController = (req, res) => {

    try {
        res.send("Protected route")
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}