import mongoose from "mongoose";

interface User {
  position?: string;
  fullName?: string;
  user?: {}[];
  voters?: {}[];
}

interface MainUser extends User, mongoose.Document {}

const vicePresidentSchema = new mongoose.Schema(
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

    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voters",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>("vicePresidents", vicePresidentSchema);
