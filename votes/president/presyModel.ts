import mongoose from "mongoose";

interface User {
  organisationName?: {};
  user?: {};
  voter?: {}[];
  postion?: string;
  fullName?: string;

  _doc: {};
}

interface MainUser extends User, mongoose.Document {
  _id?: string;
}

const presySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voters",
    },
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>("presys", presySchema);
