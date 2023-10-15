import mongoose from "mongoose";

const bookingSchema: mongoose.Schema = new mongoose.Schema({
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ticketPrice: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    isPaid: {
        type: Boolean,
        default: true,
    }

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);