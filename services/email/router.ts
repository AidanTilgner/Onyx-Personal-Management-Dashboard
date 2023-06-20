import { Router } from "express";
import { emailService } from ".";

const router = Router();

router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    if (!to || !subject || !(text || html)) {
      res.status(400).send({
        message:
          "Missing required fields. Required: to, subject, text or html.",
        data: null,
      });
      return;
    }
    const result = await emailService.sendEmail({
      to,
      subject,
      text,
      html,
    });
    res.status(200).send({ message: "Email sent", data: result });
  } catch (error) {
    emailService.error("Error sending email", error);
    res.status(500).send({ message: "Error sending email", data: null });
  }
});

export default router;
