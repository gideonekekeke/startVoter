import userModel from "../model/userModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { acceptance } from "../util/email";

import PresidentModel from "../model/PresidentModel";

import candidateModel from "../model/candidateModel";

export const readPresident = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const read = await PresidentModel.find();
    console.log(read);
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
      path: "president",
      options: { sort: { createdAt: -1 } },
    });

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
    const { fullName } = req.body;

    const user = await userModel.findById(req?.params.id);

    let name = user?.fullName;
    let email = user?.email;
    let id = user?._id;
    const candidate = await candidateModel.findOne({ fullName: name });

    if (!candidate) {
      if (user) {
        const getUser = await userModel.findById(user?._id);

        const positioned = await PresidentModel.create({
          _id: user._id,
          fullName: user?.fullName,
          image: user?.image,
          position: "President",
          user,
        });

        getUser?.president!.push(new mongoose.Types.ObjectId(positioned._id));
        getUser?.save();

        await candidateModel.create({
          fullName: user?.fullName,
          position: positioned?.position,
          user,
        });

        acceptance(email!, positioned, fullName).then((result) => {
          console.log("sent: ", result);
        });
        // console.log("getting data: ", getUser);
        return res.json({
          message: `Position as ${positioned.position} has been created for ${user?.fullName}`,
        });
      } else {
        return res.json({
          message: `You can't register because ${fullName} doesn't exist`,
        });
      }
    } else {
      return res.json({
        message: `You can't register '${name}' because he/she has already been registered, for the position of ${candidate.position}.`,
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
