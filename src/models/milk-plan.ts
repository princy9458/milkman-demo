import { Schema, model, models, Types } from "mongoose";

const milkPlanSchema = new Schema(
  {
    customerId: {
      type: Types.ObjectId,
      ref: "CustomerProfile",
      required: true,
    },
    quantityLiters: {
      type: Number,
      required: true,
      min: 0.25,
    },
    pricePerLiter: {
      type: Number,
      required: true,
      min: 0,
    },
    unitLabel: {
      type: String,
      default: "L",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MilkPlan = models.MilkPlan || model("MilkPlan", milkPlanSchema);
