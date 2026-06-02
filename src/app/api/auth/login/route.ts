import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcryptjs from "bcryptjs";
import { connectToDatabase } from "@/lib/db/connect";
import { User } from "@/models/user";
import { signToken } from "@/lib/auth";
import { LoginLog } from "@/models/login-log";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username/Email and Password are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const query = username.trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ username: query }, { email: query }, { phone: query }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { success: false, error: "Account has no password set. Please contact administrator." },
        { status: 401 }
      );
    }

    const isMatch = await bcryptjs.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    // Extract metadata
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";

    // Update users collection
    await User.findByIdAndUpdate(user._id, {
      $set: {
        lastLoginAt: new Date(),
        lastLoginIp: ipAddress,
      },
    });

    // Create login_logs entry
    const loginLog = new LoginLog({
      userId: user._id,
      username: user.username || user.phone,
      role: user.role,
      loginTime: new Date(),
      ipAddress,
      userAgent,
    });
    await loginLog.save();

    // Sign JWT
    const token = await signToken({
      id: user._id.toString(),
      phone: user.phone,
      role: user.role,
      name: user.name?.en || "",
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        phone: user.phone,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
