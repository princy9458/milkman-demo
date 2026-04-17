import { Schema, model, models, Types } from "mongoose";

const billSummarySchema = new Schema(
  {
    customerId: {
      type: Types.ObjectId,
      ref: "CustomerProfile",
      required: true,
    },
    monthKey: {
      type: String,
      required: true,
      trim: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    dueAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const BillSummary =
  models.BillSummary || model("BillSummary", billSummarySchema);
