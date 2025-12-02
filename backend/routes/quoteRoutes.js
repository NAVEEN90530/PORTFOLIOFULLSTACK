import express from "express";
import Quote from "../models/Quote.js";
import sendEmail from "../utils/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    await Quote.create({ name, email, phone, category, message });

    // Email to admin
    await sendEmail(
      process.env.ADMIN_EMAIL,
      `New Quote Request - ${name}`,
      `
Name: ${name}
Email: ${email}
Phone: ${phone}
Category: ${category}
Message:
${message}
      `
    );

    // Auto reply to user
    await sendEmail(
      email,
      "We received your quote request",
      `Hi ${name}, Thank you for contacting us. We will get back shortly.`
    );

    res.status(201).json({ message: "Quote submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
