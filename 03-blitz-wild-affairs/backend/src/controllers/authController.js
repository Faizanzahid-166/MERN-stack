// src/controllers/authController.js

import supabase from '../database/supabase.js';

import {
  hashPassword,
  comparePassword,
  sendTokenResponse,
  logoutUser,
  generateToken,
  verifyToken,
} from '../lib/auth.js';

import { uploadToSupabase } from '../middleware/upload.js';
import {sendForgotPasswordEmail} from '../services/forgetMail.service.js'

/* ───────────────── REGISTER ───────────────── */

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required.',
      });
    }

    // check existing email
    const { data: existingUser } = await supabase
      .from('02_users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already registered.',
      });
    }

    const hashedPassword = await hashPassword(password);

    let avatarUrl = null;

    if (req.file) {
      const { url } = await uploadToSupabase(req.file, 'avatars');
      avatarUrl = url;
    }

    const { data: user, error } = await supabase
      .from('02_users')
      .insert({
        name,
        email,
        password: hashedPassword,
        avatar: avatarUrl,
      })
      .select('id, name, email, role, avatar, created_at')
      .single();

    if (error) throw error;

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error('Register error:', err.message);

    res.status(500).json({
      message: err.message,
    });
  }
};

// -------------------- VERIFY OTP --------------------
// export const verifyOTP = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;
//   if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

//   const user = await User.findOne({ email });
//   if (!user) throw new ApiError(404, "User not found");

//   if (!user.otp || user.otp.code !== otp)
//     throw new ApiError(400, "Invalid OTP");

//   if (user.otp.expiresAt < new Date())
//     throw new ApiError(400, "OTP expired");

//   // Mark verified and clear OTP
//   user.emailVerified = true;
//   user.otp = null;
//   await user.save();

//   // Generate JWT
//   const token = signToken({ id: user._id, role: user.role });
//   const cookieHeader = getAuthCookieHeader(token);
//   res.setHeader("Set-Cookie", cookieHeader);

//   const { password, ...userWithoutPassword } = user.toObject();

//   // Send user back
// res.json(new ApiSuccess(200, { user: userWithoutPassword }, "..."));

// });

// -------------------- RESEND OTP --------------------
// export const resendOTP = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   if (!email) throw new ApiError(400, "Email is required");

//   const user = await User.findOne({ email });
//   if (!user) throw new ApiError(404, "User not found");

//   if (user.emailVerified)
//     throw new ApiError(400, "User already verified");

//   // OPTIONAL: Rate-limit resend (example: 1 per 60 seconds)
//   if (user.otp && user.otp.lastSentAt && (Date.now() - user.otp.lastSentAt.getTime() < 60_000)) {
//     throw new ApiError(429, "Please wait before requesting another OTP");
//   }

//   // Generate new OTP
//   const otpObj = generateOTP();
//   otpObj.lastSentAt = new Date();
//   user.otp = otpObj;
//   await user.save();

//   // Send OTP email
//   try {
//     await sendVerificationEmail(email, user.name, otpObj.code);
//   } catch (err) {
//     console.error("Failed to resend verification email:", err);
//   }

//   // Respond (DO NOT expose OTP in production)
//   res.status(200).json(
//     new ApiSuccess(200, {}, "New OTP sent to your email")
//   );
// });

/* ───────────────── LOGIN ───────────────── */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const { data: user, error } = await supabase
      .from('02_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({
        message: 'Invalid credentials.',
      });
    }

    const isMatch = await comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials.',
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Login error:', err.message);

    res.status(500).json({
      message: err.message,
    });
  }
};

/* ───────────────── LOGOUT ───────────────── */

export const logout = async (req, res) => {
  logoutUser(res);
};

/* ───────────────── GET ME ───────────────── */

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

/* ───────────────── FORGOT PASSWORD ───────────────── */

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const { data: user, error } = await supabase
      .from('02_users')
      .select('id, email, name')
      .eq('email', email)
      .single();

    // Prevent email enumeration
    if (!user || error) {
      return res.json({
        success: true,
        message: 'If the email exists, reset link sent.',
      });
    }

    // Generate reset token
    const resetToken = generateToken({
      id: user.id,
      role: 'reset',
      email: user.email,
    });

    // Send reset email
    const emailResponse = await sendForgotPasswordEmail(
      user.email,
      user.name || 'User',
      resetToken
    );

    if (!emailResponse.success) {
      return res.status(500).json({
        success: false,
        message: emailResponse.message,
      });
    }

    return res.json({
      success: true,
      message: 'Password reset email sent successfully',
    });

  } catch (err) {
    console.error('Forgot password error:', err);

    return res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
    });
  }
};

/* ───────────────── RESET PASSWORD ───────────────── */

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = verifyToken(token);

    if (!decoded?.id) {
      return res.status(400).json({
        message: 'Invalid or expired token.',
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    const { error } = await supabase
      .from('02_users')
      .update({
        password: hashedPassword,
      })
      .eq('id', decoded.id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Password reset successful.',
    });
  } catch (err) {
    console.error('Reset password error:', err.message);

    res.status(400).json({
      message: 'Invalid or expired token.',
    });
  }
};