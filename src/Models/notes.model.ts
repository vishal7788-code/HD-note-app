import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote extends Document {
  Title: string;
  Content: string;
  user: mongoose.Types.ObjectId;
  isDelete: boolean;
}

const noteSchema: Schema<INote> = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Content: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Note: Model<INote> = mongoose.model<INote>("Note", noteSchema);
