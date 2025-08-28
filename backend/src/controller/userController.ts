import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

export const signup = async (req: Request, res: Response) => {
   const { name, dateOfBirth, email } = req.body;

  if (!name || !dateOfBirth || !email) {
    return res.status(400).json({ msg: 'Please provide all required fields.' });
  }

  try {
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ msg: 'User with this email already exists. Please sign in.' });
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

    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'User created successfully. An OTP has been sent to your email to verify your account.',
    });

  } catch (err:any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

