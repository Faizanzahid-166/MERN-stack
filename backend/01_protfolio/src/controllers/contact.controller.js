import nodemailer from "nodemailer";

export const contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, msg: "All fields required" });
    }

    // Setup mail transporter (using Gmail here, but can be any SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Mail options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ success: false, msg: "Something went wrong" });
  }
};
