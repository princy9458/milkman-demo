import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "CUSTOMER"],
      required: true,
      default: "CUSTOMER",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
    },
    preferredLanguage: {
      type: String,
      enum: ["en", "hi"],
      default: "en",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export const User = models.User || model("User", userSchema);
