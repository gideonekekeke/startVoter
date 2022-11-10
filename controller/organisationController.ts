import organisationModel from "../model/organisationModel";
import { Response, Request } from "express";
import candidateModel from "../model/candidateModel";

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
export const getCandidates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const organisation = await candidateModel.find();

    return res.json({
      message: "Organisation found",
      data: organisation,
    });
  } catch (err) {
    return res.json({ message: err });
  }
};

export const getOrganisationMembers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const organisation = await organisationModel
      .findById(req.params.id)
      .populate({ path: "user", options: { sort: { createdAt: -1 } } });

    return res.status(200).json({
      message: "Organisation Members found",
      data: organisation,
    });
  } catch (err) {
    return res.status(404).json({ message: `Error: ${err}` });
  }
};
