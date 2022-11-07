import mongoose from "mongoose";

interface User {
  organisationName?: {};
  presidentPosition?: {}[];
  voter?: {}[];
  // candiadte?: {}[];
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
      unique: true,
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

    presidentPosition: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "presidents",
      },
    ],

    vicePresident: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vicePresidents",
      },
    ],

    secretary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "secretarys",
      },
    ],

    socialSecretary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "socialSecretarys",
      },
    ],

    pro: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pros",
      },
    ],

    legal: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "legals",
      },
    ],

    voter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voters",
      },
    ],

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
