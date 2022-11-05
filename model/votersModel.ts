import mongoose from "mongoose";

interface User {
  organisationName?: {};
  user?: {};
  voters?: {}[];
  postion?: string;
  fullName?: string;

  _doc: {};
}

interface MainUser extends User, mongoose.Document {
  _id?: string;
}

const candidateSchema = new mongoose.Schema(
  {
    position: {
      type: String,
    },

    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voters",
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    organisationName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organisations",
    },
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>("candidates", candidateSchema);
