import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { supabase } from "@/app/store/supabase";

const SECRET = process.env.JWT_SECRET!; 

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Both fields are required" }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from("citisignup")
      .select("id, email, password")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      SECRET,
      { expiresIn: "1h" } 
    );

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
