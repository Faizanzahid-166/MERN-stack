import { Resend } from "resend";
import ForgetPWEmail from "../email/forgetPWEmail.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendForgotPasswordEmail(email, name, resetToken) {
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.RESEND_FROM_EMAIL ||
    !process.env.NEXT_PUBLIC_APP_DOMAIN
  ) {
    console.error("Email service not configured");

    return {
      success: false,
      message: "Email service not configured",
    };
  }

  try {
    const resetUrl =
`${process.env.NEXT_PUBLIC_APP_DOMAIN}/reset-password?token=${resetToken}`;
    // const resetUrl =
    //   `${process.env.NEXT_PUBLIC_APP_DOMAIN}` +
    //   `/reset-password/${resetToken}`;
  //      const resetUrl =
  // `${process.env.NEXT_PUBLIC_APP_DOMAIN}/reset-password-token/${resetToken}`;

    const html = ForgetPWEmail({
      name,
      resetUrl,
    });

    await resend.emails.send({
      from: `Blitz Wild Affairs <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: "Blitz Wild Affairs | Reset Password",
      html,
    });

    return {
      success: true,
      message: `Password reset email sent to ${email}`,
    };
  } catch (err) {
    console.error(
      "Error sending forgot password email:",
      err.response?.data || err
    );

    return {
      success: false,
      message: "Failed to send forgot password email",
    };
  }
}