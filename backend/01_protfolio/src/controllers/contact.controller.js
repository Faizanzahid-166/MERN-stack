import nodemailer from "nodemailer";

export const contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, msg: "All fields required" });
    }

    // ✅ Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // or 587
      secure: true, // true = 465, false = 587
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    // ✅ Mail options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // always your Gmail
      replyTo: email, // so you can reply directly to sender
      to: process.env.EMAIL_USER, // send to yourself
      subject: `📩 New Contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, msg: "✅ Message sent successfully!" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ success: false, msg: "❌ Something went wrong. Try again later." });
  }
};
