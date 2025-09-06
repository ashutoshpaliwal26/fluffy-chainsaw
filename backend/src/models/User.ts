import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserPayload{
  _id : string,
  name : string,
  email : string,
  role: 'user' | 'admin'
}

// Interface to define the properties of a User document
export interface IUser extends Document {
  picture : string;
  name: string;
  email: string;
  password?: string; // Optional because it will be removed in some queries
  address?: string;
  city?: string;
  zipcode?: string;
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword : (candiatePassword: string) => Promise<boolean>
}

// Mongoose Schema for the User model
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Automatically exclude password from query results
  },
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  zipcode: {
    type: String,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  picture : {
    type : String,
    default : "https://res.cloudinary.com/djfi9rtlx/image/upload/v1757095269/icons8-user-48_rnrhia.png"
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true,
});

// Pre-save middleware to hash the password before saving the document
userSchema.pre<IUser>('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    // If an error occurs, pass it to the next middleware
    if (error instanceof Error) {
      return next(error);
    }
    return next(new Error('Password hashing failed'));
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
}

// Create and export the User model
const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
