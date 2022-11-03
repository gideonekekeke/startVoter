import database from "../util/organisationData.json";
import userModel from "../model/userModel";
import organisationModel from "../model/organisationModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cloudinary from "../util/cloudinary";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { verifiedUser, verifiedSignUser } from "../util/email";

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
    const read = await organisationModel
      .findById(req.params.id)
      .populate("user");
    return res.json({ message: "Reading all Users", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};
