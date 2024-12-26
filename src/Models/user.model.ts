import mongoose,{Schema, Document, Model} from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  dateOfBirth: Date;
  otp?: string;
}
const userSchema:Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  }
},
{
    timestamps:true
});

export const User: Model<IUser>= mongoose.model<IUser>("User", userSchema)