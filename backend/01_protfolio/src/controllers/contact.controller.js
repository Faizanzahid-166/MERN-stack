import nodemailer from "nodemailer";

export const contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, msg: "⚠️ All fields are required" });
    }

    // Create transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // must be an App Password, not your Gmail login
      },
    });

    // Mail options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // where you want to receive the message
      subject: `📩 New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, msg: "✅ Message sent successfully!" });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    return res.status(500).json({
      success: false,
      msg: "Server error. Please try again later.",
      error: err.message, // only expose error message (optional)
    });
  }
};
