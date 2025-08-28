// backend/src/models/userModel.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the shape of a User document
export interface IUser extends Document {
  name: string;
  dateOfBirth: Date;
  email: string;
  password?: string;
  isVerified: boolean;
  otp?: string; // New field for storing the OTP
  otpExpires?: Date; // New field for the OTP expiration time
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  isVerified: { type: Boolean, default: false },
  otp: { type: String, required: false },
  otpExpires: { type: Date, required: false }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;