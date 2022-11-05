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
  resetMyPassword,
} from "../util/email";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { fullName, organisationName, email, password } = req.body;
    console.log("Org Name: ", organisationName, fullName);

    const findOrg = await organisationModel.findOne({
      organisationName,
    });

    if (findOrg) {
      const getOrganisation = await organisationModel.findById(findOrg._id);

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const val = Math.random() * 1000;
      const realToken = jwt.sign(val, "this is the Word");

      const img = await cloudinary.uploader.upload(req.file?.path);

      const getUser = await userModel.create({
        fullName,
        email,
        password: hash,
        orgName: organisationName,
        orgEmail: getOrganisation?.email,
        token: realToken,
        image: img.secure_url,
      });

      getOrganisation?.user!.push(new mongoose.Types.ObjectId(getUser._id));
      getOrganisation?.save();

      verifiedUser(email, fullName, realToken, getUser).then((result) => {
        console.log("sent: ", result);
      });

      return res.json({
        message:
          "Account has been created, please check your mail to finish up the Process!",
      });
    } else {
      return res.json({
        message: `You can't register because ${organisationName} doesn't exist`,
      });
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

    const generateToken = crypto.randomBytes(2).toString("hex");
    const getUser = await userModel.findById(req.params.id);

    if (response === "Yes") {
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
    }

    if (response === "No") {
      if (getUser) {
        await userModel.findByIdAndDelete(req.params.id);
        // verifiedByAdminFinally(getUser, generateToken).then((result) => {
        //   console.log("sent: ", result);
        // });
        res.status(201).json({ message: "user has been deleted" });
      }
    } else {
      return res.json({ message: "You can't be accepted" });
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
    // if (user) {
    //   const pass = await bcrypt.compare(password, user.password);
    //   if (pass) {
    //     if (voteCode === user.voteCode) {
    //       if (user.verified) {
    //         const { ...info } = user._doc;
    //         const tokenData = jwt.sign(
    //           { id: user._id, fullName: user.fullName, email: user.email },
    //           "VoterCode"
    //         );

    //         return res.status(200).json({
    //           message: `welcome back ${user.fullName}`,
    //           data: { tokenData, info },
    //         });

    //       } else {
    //         return res.status(404).json({
    //           message: "error: user hasn't been verified",
    //         });
    //       }
    //     }
    //   } else {
    //     return res.status(404).json({
    //       message: "error: password not correct",
    //     });
    //   }
    // } else {
    //   return res.status(404).json({
    //     message: "error: ",
    //   });
    // }

    // const { ...info } = user._doc;
    // const tokenData = jwt.sign(
    //   { id: user._id, fullName: user.fullName, email: user.email },
    //   "VoterCode"
    // );

    if (user?.verified && user.token === "" && user.voteCode === voteCode) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        const getToken = jwt.sign(
          {
            email: user.email,
            _id: user._id,
            fullName: user.fullName,
          },
          "voteApp"
        );

        const { ...info } = user._doc;

        res.status(200).json({
          message: `welcome back ${user.fullName}`,
          data: { getToken, ...info },
        });
      } else {
        return res.status(404).json({
          message: "error: password is incorrect",
        });
      }
    } else {
      return res.status(404).json({
        message: "error: no user found",
      });
    }
  } catch (err) {
    return res.status(404).json({
      message: "error: ",
      err,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      if (user?.verified && user?.token === "") {
        const token = crypto.randomBytes(5).toString("hex");
        const myToken = jwt.sign({ token }, "ThisIsAVoteApp");

        await userModel.findByIdAndUpdate(
          user._id,
          { token: myToken },
          { new: true }
        );
        resetMyPassword(user, myToken)
          .then((result) => {
            console.log("message been sent to you: ");
          })
          .catch((error) => console.log(error));

        return res.status(200).json({
          message: "Please check your email to continue",
        });
      } else {
        return res
          .status(404)
          .json({ message: "You do not have enough right to do this!" });
      }
    } else {
      return res.status(404).json({ message: "user can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password } = req.body;
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.verified && user.token === req.params.token) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        await userModel.findByIdAndUpdate(
          user._id,
          {
            token: "",
            password: hashed,
          },
          { new: true }
        );
      }
    } else {
      return res.status(404).json({ message: "operation can't be done" });
    }

    return res.status(200).json({
      message: "password has been changed",
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
