// utils/email.js
// Email helper — wire up your preferred provider here.
// Options: Resend (recommended), Nodemailer + SMTP, SendGrid, Mailgun

// ── Example using Resend (https://resend.com) ──────────────────
// npm install resend
//
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);
//
// export const sendPasswordResetEmail = async (to, resetToken) => {
//   const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
//   await resend.emails.send({
//     from: 'BlogForge <noreply@yourdomain.com>',
//     to,
//     subject: 'Reset your BlogForge password',
//     html: `
//       <h2>Password Reset</h2>
//       <p>Click the link below to reset your password. It expires in 15 minutes.</p>
//       <a href="${resetUrl}" style="background:#c44df0;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;">
//         Reset Password
//       </a>
//       <p>If you didn't request this, ignore this email.</p>
//     `,
//   });
// };

// ── Placeholder (logs to console in development) ───────────────
export const sendPasswordResetEmail = async (to, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  console.log(`\n📧 [DEV] Password reset email to: ${to}`);
  console.log(`   Reset URL: ${resetUrl}\n`);
  // In production, replace this with a real email send.
};

export const sendWelcomeEmail = async (to, name) => {
  console.log(`\n📧 [DEV] Welcome email to: ${to} (${name})\n`);
};
