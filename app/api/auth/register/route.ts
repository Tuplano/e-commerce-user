// /app/api/auth/register/route.ts

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/users";
import bcrypt from "bcryptjs";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists." }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(JSON.stringify({ message: "User registered successfully." }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
