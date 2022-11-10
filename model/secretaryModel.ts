import mongoose from "mongoose";

interface User {
  position?: string;
  fullName?: string;
  image?: string;
  user?: {}[];
  voter?: {}[];
}

interface MainUser extends User, mongoose.Document {
  // _id: string;
}

const secretarySchema = new mongoose.Schema(
  {
    // _id: { type: String, unique: true },
    fullName: {
      type: String,
    },
    position: {
      type: String,
    },
    image: {
      type: String,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    voter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voters",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>("secretarys", secretarySchema);
