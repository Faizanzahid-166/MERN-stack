import { Resend } from "resend";

// Initialize lazily (SAFE)
let resend = null;

if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  //console.log(process.env.RESEND_API_KEY)
} else {
  console.warn("⚠️ RESEND_API_KEY not set. Email sending disabled.");
}

export const contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        msg: "⚠️ All fields are required",
      });
    }

    // 🔐 Prevent crash if key missing
    if (!resend) {
      return res.status(503).json({
        success: false,
        msg: "Email service unavailable (missing API key)",
      });
    }

    const response = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER,
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      msg: "✅ Message sent successfully!",
      response,
    });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    return res.status(500).json({
      success: false,
      msg: "Something went wrong.",
      error: err.message,
    });
  }
};
