import mongoose, { Schema, model } from "mongoose";

interface Usermodeltype {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    isverified?: boolean
}

const Usermodel = new Schema<Usermodeltype>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isverified: {
        type:Boolean,
        default: false
    }
});

const User = model<Usermodeltype>('Userhighway', Usermodel);
export default User;
