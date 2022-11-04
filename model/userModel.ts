import mongoose from "mongoose";

interface User {
  organisationName?: {};
  orgName?: string;
  orgEmail?: string;
  fullName?: string;
  email: string;
  password: string;
  image?: string;
  voteCode?: string;
  token?: string;
  verified?: boolean;
  superAdmin?: boolean;
  _doc: {};
}

interface MainUser extends User, mongoose.Document {
  _id?: string;
}

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    orgName: {
      type: String,
    },
    orgEmail: {
      type: String,
    },
    voteCode: {
      type: String,
    },
    organisationName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organisations",
    },
    verified: {
      type: Boolean,
    },
    superAdmin: {
      type: Boolean,
    },
    token: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<MainUser>("users", userSchema);
