// utils/email.js
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: Number(process.env.SMTP_PORT) === 465, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      text: message,
    });

    console.log("📩 Email sent successfully");
  } catch (error) {
    console.log("❌ Email send error:", error.message);
  }
};

export default sendEmail;
