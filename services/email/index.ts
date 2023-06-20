import { Service } from "..";
import { sendEmail, EmailConfig } from "./nodemailer";

class EmailService extends Service {
  constructor() {
    super({ name: "email", version: "1.0.0" });
  }

  public async sendEmail({ to, subject, text, html }: EmailConfig) {
    const res = await sendEmail({ to, subject, text, html });
    if (res) {
      this.log(`Email sent to ${to}`);
    } else {
      this.error(`Email failed to send to ${to}`);
    }
    return res;
  }
}

export const emailService = new EmailService();
export { default as emailRouter } from "./router";
