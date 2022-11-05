import userModel from "../model/userModel";
import organisationModel from "../model/organisationModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  verifiedUser,
  verifiedByAdmin,
  verifiedByAdminFinally,
  acceptance,
} from "../util/email";

import PresidentModel from "../model/PresidentModel";
import candidateModel from "../model/candidateModel";

export const readPresident = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await PresidentModel.find();
    return res.json({ message: "Reading all President", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const readPresidentFromUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await userModel.findById(req.params.id).populate({
      path: "presidentPosition",
      options: { sort: { createdAt: -1 } },
    });

    console.log("read");

    return res.json({
      message: "Reading all Organisation Users",
      data: read,
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const createPresident = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { fullName, position } = req.body;

    const user = await userModel.findById(req?.params.id);
    let name = user?.fullName;
    let email = user?.email;
    const candidate = await candidateModel.findOne({ name });

    if (!candidate) {
      if (user) {
        const getUser = await userModel.findById(user?._id);
        const positioned = await PresidentModel.create({
          fullName: user?.fullName,
          position: "President",
          user,
        });

        getUser?.presidentPosition!.push(
          new mongoose.Types.ObjectId(positioned._id)
        );
        getUser?.save();

        const candidateVal = await candidateModel.create({
          fullName: user?.fullName,
          position: "President",
          user,
        });

        getUser?.candiadte!.push(new mongoose.Types.ObjectId(candidateVal._id));
        getUser?.save();

        acceptance(email, positioned, fullName).then((result) => {
          console.log("sent: ", result);
        });
        // console.log("getting data: ", getUser);
        return res.json({
          message: `Position as President has been created for ${user?.fullName}`,
        });
      } else {
        return res.json({
          message: `You can't register because ${fullName} doesn't exist`,
        });
      }
    } else {
      return res.json({
        message: `You can't register '${name}' because he/she has been registered, for other position.`,
      });
    }
  } catch (err) {
    return res.json({ message: `error message: ${err}` });
  }
};
export const readCandidate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await candidateModel.find();
    return res.json({ message: "Reading all candidate", data: read });
  } catch (error) {
    return res.json({ message: error });
  }
};
