import mongoose, { Document, Model, Schema } from "mongoose";

interface IExperience {
  startingDate: string;
  endDate: string;
  position: string;
  hospital: string;
}

interface ITimeSlot {
  day: string;
  startingTime: string;
  endingTime: string;
}

export interface ITrainer extends Document {
  email: string;
  password: string;
  name: string;
  phone: number;
  photo: string;
  ticketPrice: number;
  role: string;
  specialization: string;
  experience: IExperience[];
  bio: string;
  about: string;
  timeSlots: ITimeSlot[];
  reviews: mongoose.Types.ObjectId[];
  averageRating: number;
  totalRating: number;
  isApproved: "pending" | "approved" | "cancelled";
  appointments: mongoose.Types.ObjectId[];
}

const TrainerSchema: Schema = new Schema<ITrainer>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },
  specialization: { type: String },
  experience: [{ type: Object }],
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: [{ type: Object }],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },

  totalRating: {
    type: Number,
    default: 0,
  },

  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

const Trainer: Model<ITrainer> = mongoose.model<ITrainer>(
  "Trainer",
  TrainerSchema
);

export default Trainer;
