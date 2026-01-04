// utils/email.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587, // ✅ ALWAYS use 587 on Render
      secure: false, // ❌ false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // ✅ IMPORTANT for Render
      },
    });

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html: message,
    });

    console.log("📩 Email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Email error:", error);
    return false;
  }
};

export default sendEmail;
