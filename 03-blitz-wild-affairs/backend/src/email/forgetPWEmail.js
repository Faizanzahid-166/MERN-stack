// Plain JS email template for forgot password
export default function ForgetPWEmail({ name, resetUrl }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Password</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }

          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          }

          h1 {
            color: #222;
            margin-bottom: 20px;
          }

          p {
            color: #555;
            font-size: 16px;
            line-height: 1.6;
          }

          .button {
            display: inline-block;
            margin-top: 20px;
            padding: 14px 24px;
            background-color: #000;
            color: #fff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
          }

          .button:hover {
            opacity: 0.9;
          }

          .footer {
            margin-top: 30px;
            font-size: 13px;
            color: #999;
          }

          .warning {
            margin-top: 20px;
            font-size: 14px;
            color: #d9534f;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>Hello ${name},</h1>

          <p>
            We received a request to reset your password.
          </p>

          <p>
            Click the button below to create a new password:
          </p>

          <a href="${resetUrl}" class="button">
            Reset Password
          </a>

          <p class="warning">
            This link will expire soon for security reasons.
          </p>

          <p class="footer">
            If you did not request a password reset, you can safely ignore this email.
          </p>
        </div>
      </body>
    </html>
  `;
}