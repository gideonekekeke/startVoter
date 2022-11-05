import mongoose from "mongoose";

interface User {
  position?: string;
  fullName?: string;
  user?: {}[];
}

interface MainUser extends User, mongoose.Document {}

const candidateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    position: {
      type: String,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>("candidates", candidateSchema);
