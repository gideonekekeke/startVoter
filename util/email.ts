import { google } from "googleapis";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1001238833498-cqm9f9c1mh3m1khppm3392npjalj8b4s.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//04h7d93kXEa_mCgYIARAAGAQSNwF-L9IrRBMf9gTPHHPp4rsWwU2m6arOFmIUgpZPaL-Cov37TXIF6SM2XIoFhScTFOD1ZDaezBY";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const url: string = "localhost:2245";

interface iData {
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
}

export const verifiedUser = async (
  email: string,
  fullName: string,
  realToken: string,
  getUser: {}
) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/AccountCreated.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: fullName,
      id: getUser?._id,
      realToken,
      organisation: getUser?.orgName,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
      to: email,
      subject: "Account Verification",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

export const verifiedByAdmin = async (
  generateToken: string,
  getUser: iData
) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    console.log("userData: ", generateToken);

    const buildFile = path.join(__dirname, "../views/viewByAdmin.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: generateToken?.fullName,
      organisation: generateToken?.orgName,
      id: generateToken?._id,
      code: generateToken.voteCode,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
      to: generateToken?.orgEmail,
      subject: "Please Verify this Account",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

export const verifiedByAdminFinally = async (
  generateToken: string,
  getUser: iData
) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    console.log("userData: ", generateToken);

    const buildFile = path.join(__dirname, "../views/voterCode.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: generateToken?.fullName,
      organisation: generateToken?.orgName,
      id: generateToken?._id,
      code: generateToken.voteCode,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤ <newstudentsportal2@gmail.com>",
      to: generateToken?.orgEmail,
      subject: `${generateToken?.fullName}'s Account has been Verify`,
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

export const verifiedSignUser = async (findUser: {}) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/signinAccount.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: findUser?.fullName,
      id: findUser?._id,
      myToken: findUser?.token,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
      to: findUser?.email,
      subject: "Account re-Verification",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

export const resetMyPassword = async (name, user: {}, myToken: string) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/resetPassword.ejs");

    const data = await ejs.renderFile(buildFile, {
      name,
      id: user?._id,
      myToken,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
      to: user?.email,
      subject: "Requesting for Password Reset",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};

export const acceptance = async (
  email: string,
  positioned: {},
  fullName: string
) => {
  try {
    console.log("position from email: ", positioned?.position);

    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ajwalletcoins@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/Acceptance.ejs");

    const data = await ejs.renderFile(buildFile, {
      name: positioned?.fullName,
      position: positioned?.position,
      email: email,
    });

    const mailOptions = {
      from: "AJ Vote ❤❤❤  <newstudentsportal2@gmail.com>",
      to: email,
      subject: `Acceptance for the Position of ${positioned?.position}`,
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("sent successfully");
    });
  } catch (error) {
    return error;
  }
};
