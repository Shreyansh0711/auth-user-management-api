// utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 465),
    secure:
      process.env.EMAIL_SECURE === "true" || process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
console.log({
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS ? "Loaded" : "Missing",
});
  try {
  await transporter.verify();
    console.log("SMTP connection verified");

    // 👇 Then send the email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });

  console.log("Email sent successfully");
} catch (err) {
  console.error("sendMail failed:");
  console.error(err);
  throw err;
}
};
