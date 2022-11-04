import database from "../util/organisationData.json";
import userModel from "../model/userModel";
import organisationModel from "../model/organisationModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cloudinary from "../util/cloudinary";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  verifiedUser,
  verifiedSignUser,
  verifiedByAdmin,
  verifiedByAdminFinally,
} from "../util/email";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { fullName, organisationName, email, password, token } = req.body;
    const name = organisationName.toLowerCase();

    const findOrg = await organisationModel.findOne({
      organisationName,
    });

    if (findOrg) {
      const getOrganisation = await organisationModel.findById(findOrg._id);

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const val = Math.random() * 1000;
      const realToken = jwt.sign(val, "this is the Word");

      //   const img = await cloudinary.uploader.upload(req.file.path);

      const getUser = await userModel.create({
        fullName,
        email,
        password: hash,
        orgName: organisationName,
        orgEmail: getOrganisation?.email,
        token: realToken,
      });

      getOrganisation?.user!.push(new mongoose.Types.ObjectId(getUser._id));
      getOrganisation?.save();

      verifiedUser(email, fullName, realToken, getUser).then((result) => {
        console.log("sent: ", result);
      });

      return res.end("We are ready");
    } else {
      return res.json({ message: "You can't register" });
    }
  } catch (err) {
    return res.json({ message: err });
  }
};

export const readUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await userModel.find();
    return res.json({ message: "Reading all Users", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const readOrgUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("read");

    const read = await organisationModel.findById(req.params.id);
    // .populate({
    //   path: "user",
    //   options: { createdAt: -1 },
    // });

    console.log("read");
    console.log(read);

    return res.json({
      message: "Reading all Organisation Users",
      data: "read",
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const VerifiedUser = async (req: Request, res: Response) => {
  try {
    const generateToken = crypto.randomBytes(2).toString("hex");
    const getUser = await userModel.findById(req.params.id);

    if (getUser) {
      console.log("start: ", generateToken);

      await userModel.findByIdAndUpdate(
        req.params.id,
        {
          voteCode: generateToken,
        },
        { new: true }
      );

      console.log("show Data: ", getUser);

      verifiedByAdmin(getUser, generateToken).then((result) => {
        console.log("sent: ", result);
      });

      res.status(201).json({ message: "Sent..." });
    } else {
      return res.status(404).json({
        message: "user doesn't exist",
      });
    }
  } catch (err) {
    return res.json({ message: err });
  }
};

export const VerifiedUserFinally = async (req: Request, res: Response) => {
  try {
    const { response } = req.body;
    console.log(response);
    console.log("Got it");

    const generateToken = crypto.randomBytes(2).toString("hex");
    const getUser = await userModel.findById(req.params.id);

    if (response === "yes") {
      if (getUser) {
        await userModel.findByIdAndUpdate(
          req.params.id,
          {
            token: "",
            verified: true,
          },
          { new: true }
        );

        verifiedByAdminFinally(getUser, generateToken).then((result) => {
          console.log("sent: ", result);
        });

        res.status(201).json({ message: "Sent..." });
      } else {
        return res.status(404).json({
          message: "user doesn't exist",
        });
      }
    } else {
      return res.json({ message: "You can be accepted" });
    }

    res.end();
  } catch (err) {
    return;
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, voteCode, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const pass = await bcrypt.compare(password, user.password);

      if (pass) {
        if (voteCode === user.voteCode) {
        } else {
          return res.status(404).json({
            message: "error: voteCode is not correct",
          });
        }
      } else {
        return res.status(404).json({
          message: "error: password not correct",
        });
      }
    } else {
      return res.status(404).json({
        message: "error: ",
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: "error: ",
      err,
    });
  }
};
