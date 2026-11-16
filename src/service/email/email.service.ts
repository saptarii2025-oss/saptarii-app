import nodemailer from "nodemailer";

import { Reason, ResponseDto } from "@/types";
import { SendEmailInput, SendEmailResponse } from "@/types/email";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
  throw new Error(Reason.EMAIL_CONFIG_ERROR);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (
  input: SendEmailInput,
): Promise<ResponseDto<SendEmailResponse>> => {
  try {
    const { to, subject, html } = input;

    const response = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      html,
    });

    return {
      data: { messageId: response.messageId },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : "Failed to send email",
        reason: Reason.EMAIL_SEND_ERROR,
      },
    };
  }
};
export { sendEmail };
