
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { username, currentPassword, newPassword } = await req.json();

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (newPassword) {
    if (user.password) {
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
      }
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ message: "Password too short" }, { status: 400 });
    }

    user.password = await bcrypt.hash(newPassword, 10);
  }

  if (username && username !== user.username) {
    user.username = username;
  }

  await user.save();
  return NextResponse.json({ message: "Profile updated" }, { status: 200 });
}
