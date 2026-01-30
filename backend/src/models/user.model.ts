import {model, Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        avatar: {type: String, default: ""},
        role: {type: String, enum: ["admin", "user"], default: "user"},
        refreshToken: {type: String, default: ""},
        resetOTP: {type: String},
        resetOTPExpires: {type: Date},
        isOnline: {type: Boolean, default: false},
        lastSeen: {type: Date, default: Date.now},
    },
    {timestamps: true}
);

export const UserModel = model("UserModel", userSchema);
