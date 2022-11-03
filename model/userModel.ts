import mongoose from "mongoose";

interface User {
  organisationName?: {};
  orgName?: string;
  fullName?: string;
  email: string;
  password: string;
  image?: string;
  voteCode?: number;
  token?: string;
  verified?: boolean;
  superAdmin?: boolean;
}

interface MainUser extends User, mongoose.Document {
  _id?: string;
}

const userSchema = new mongoose.Schema({
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
  voteCode: {
    type: Number,
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
});

export default mongoose.model<MainUser>("users", userSchema);
