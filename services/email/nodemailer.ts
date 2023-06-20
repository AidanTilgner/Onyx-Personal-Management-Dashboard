import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

const { EMAIL_SERVICE_EMAIL, GOOGLE_MAIL_APP_PASSWORD } = process.env;

const verifyConfigured = () => {
  if (!EMAIL_SERVICE_EMAIL) {
    throw new Error("EMAIL_SERVICE_EMAIL not configured");
  }
  if (!GOOGLE_MAIL_APP_PASSWORD) {
    throw new Error("GOOGLE_MAIL_APP_PASSWORD not configured");
  }
};

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_SERVICE_EMAIL,
    pass: GOOGLE_MAIL_APP_PASSWORD,
  },
});

export interface EmailConfig {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailConfig) => {
  try {
    verifyConfigured();

    const info = await transporter.sendMail({
      from: EMAIL_SERVICE_EMAIL,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.error(error);
    return false;
  }
};
