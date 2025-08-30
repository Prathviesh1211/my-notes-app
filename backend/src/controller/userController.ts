import { Request, Response } from 'express';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import { sendOtpEmail } from '../utils/emailService';

// @desc    Register a new user and generate OTP
// @route   POST /api/users/signup
// @access  Public
export const signup = async (req: Request, res: Response) => {
  const { name, dateOfBirth, email } = req.body;

  if (!name || !dateOfBirth || !email) {
    return res.status(400).json({ msg: 'Please provide all required fields.' });
  }

  try {
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ msg: 'User already exists. Please sign in.' });
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60000);

    if (!user) {
      user = new User({ name, dateOfBirth, email });
    }
    
    user.otp = otp;
    user.otpExpires = otpExpires;
    user.isVerified = false;
    await user.save();

    // Call the email service to send the OTP
    await sendOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      message: 'OTP has been sent to your email to verify your account.',
    });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Authenticate user & get OTP
// @route   POST /api/users/signin
// @access  Public
export const signin = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: 'Please provide an email.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found. Please sign up.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Call the email service to send the OTP
    await sendOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      message: 'OTP has been sent to your email to sign in.',
    });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Verify OTP and log in the user
// @route   POST /api/users/verify-otp
// @access  Public
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ msg: 'Please provide email and OTP.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    if (user.otp !== otp || (user.otpExpires && user.otpExpires < new Date())) {
      return res.status(400).json({ msg: 'Invalid or expired OTP.' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Account verified successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
