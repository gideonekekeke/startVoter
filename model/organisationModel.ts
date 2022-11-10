import mongoose from "mongoose";

interface User {
  organisationName?: string;
  email?: string;
  user?: {}[];
}

interface MainUser extends User, mongoose.Document {}

const organisationSchema = new mongoose.Schema(
  {
    organisationName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },

    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>("organisations", organisationSchema);
