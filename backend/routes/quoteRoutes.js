import express from "express";
import Quote from "../models/Quote.js";
import sendEmail from "../utils/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, domain, message } = req.body;

    // Save quote to database
    const quote = await Quote.create({ name, email, phone, domain, message });

    // Styled email to admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #FFD700;">New Quote Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Domain:</strong> ${domain}</p>
        <p><strong>Message:</strong></p>
        <p style="padding: 10px; background-color: #f4f4f4; border-radius: 5px;">${message}</p>
      </div>
    `;

    await sendEmail(process.env.ADMIN_EMAIL, `New Quote Request - ${name}`, adminEmailContent);

    // Styled auto-reply to user
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #D4AF37;">Hello ${name},</h2>
        <p>Thanks for contacting us! We received your message regarding <span  style="color: #D4AF37;">${domain}</span> and will get back to you shortly.</p>
        <p>Your message:</p>
        <p style="padding: 10px; background-color: #f4f4f4; border-radius: 5px;">${message}</p>
        <br/>
        <p>Thank you,<br/>Admin Team</p>
      </div>
    `;

    await sendEmail(email, "Thank you for contacting us", userEmailContent);

    res.status(201).json({ message: "Quote submitted successfully", quote });
  } catch (error) {
    console.error("❌ Quote submission error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
