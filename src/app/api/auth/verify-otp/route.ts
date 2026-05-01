import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";
import { User } from "@/models/user";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { phone, otp, intendedRole } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    await connectToDatabase();

    let user = await User.findOne({ phone });

    if (!user) {
      // Auto-create user in dev bypass if not found
      if (process.env.NODE_ENV === "development" && otp === "123456") {
        user = await User.create({
          phone,
          role: intendedRole === "admin" ? "SUPER_ADMIN" : "CUSTOMER",
          status: "ACTIVE"
        });
      } else {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }

    // Bypass OTP verification in development mode
    const isDevBypass = process.env.NODE_ENV === "development" && otp === "123456";

    if (isDevBypass) {
      // Update role based on intent for demo
      user.role = intendedRole === "admin" ? "SUPER_ADMIN" : "CUSTOMER";
      await user.save();
    } else {
      // Check if OTP matches and is not expired
      if (user.otp !== otp) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
      }

      if (new Date() > user.otpExpiry) {
        return NextResponse.json({ error: "OTP expired" }, { status: 401 });
      }
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Create JWT token
    const token = await signToken({
      id: user._id,
      phone: user.phone,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        phone: user.phone,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
