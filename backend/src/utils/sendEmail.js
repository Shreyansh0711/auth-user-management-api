import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, html }) => {
  console.log({
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS ? "Loaded" : "Missing",
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true, // Port 465 uses secure: true
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  try {
    await transporter.verify();
   console.log("SMTP verified");
    await transporter.sendMail({
  from: `"MeTube" <${process.env.EMAIL_FROM}>`,
  to: email,
  subject: "Password Reset",
  html,
});

    console.log("Email sent successfully");
  } catch (err) {
    console.error("Email failed:", err);
    throw err;
  }
};