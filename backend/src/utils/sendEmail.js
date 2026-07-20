import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    console.log("Email sent successfully", data);
  } catch (err) {
    console.error("Email failed:", err);
    throw err;
  }
};