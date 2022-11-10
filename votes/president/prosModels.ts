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

const prosSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>("pross", prosSchema);
