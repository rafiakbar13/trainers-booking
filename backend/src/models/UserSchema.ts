import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    photo: string;
    role: "member" | "admin";
    gender: "male" | "female" | "other";
    phone?: number;
    appointments: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number },
    photo: { type: String },
    role: {
        type: String,
        enum: ["member", "admin"],
        default: "member",
    },
    gender: { type: String, enum: ["male", "female", "other"] },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
