import organisationModel from "../model/organisationModel";
import { Response, Request } from "express";

export const createOrganisation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { organisationName, email } = req.body;

    const organisation = await organisationModel.create({
      organisationName,
      email,
    });

    return res.json({
      message: "Organisation created",
      data: organisation,
    });
  } catch (err) {
    return res.json({ message: err });
  }
};

export const getOrganisation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const organisation = await organisationModel.find();

    return res.json({
      message: "Organisation found",
      data: organisation,
    });
  } catch (err) {
    return res.json({ message: err });
  }
};
