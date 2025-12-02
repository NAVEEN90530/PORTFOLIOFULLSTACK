import Quote from "../models/Quote.js";
import { sendEmail } from "../utils/email.js";

// ⭐ SUBMIT QUOTE (USER)
export const submitQuote = async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    const quote = await Quote.create({
      name,
      email,
      phone,
      category,
      message,
    });

    // send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Quote Request",
      message: `
        <h3>New Quote Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Category:</b> ${category}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(201).json({ message: "Quote submitted successfully", quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ GET ALL QUOTES (ADMIN ONLY)
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ ADMIN REPLY TO USER EMAIL
export const replyToQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    const quote = await Quote.findById(id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    // send email to user
    await sendEmail({
      to: quote.email,
      subject: "Response to Your Quote Request",
      message: `
        <h3>Hello ${quote.name},</h3>
        <p>${replyMessage}</p>
        <br />
        <p>Thank you,<br/>Admin Team</p>
      `,
    });

    quote.replied = true;
    await quote.save();

    res.status(200).json({ message: "Reply sent to user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
