import {Schema, model, Types} from "mongoose";

const messageSchema = new Schema({
    sender: {type: Types.ObjectId, ref: "UserModel", required: true},
    receiver: {type: Types.ObjectId, ref: "UserModel", required: true},
    text: {type: String, default: ""},
    seen: {type: Boolean, default: false}
}, {timestamps: true});

export const MessageModel = model("Message", messageSchema);
