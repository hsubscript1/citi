import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/app/store/supabase";

const SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, SECRET) as { userId: string; email: string };
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("citisignup")
      .select("id, fname, lname, email, profilepicture, birthday, gender")
      .eq("id", decoded.userId) // ✅ now fetch using verified userId
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: data.id,
        firstName: data.fname,
        lastName: data.lname,
        email: data.email,
        profilePicture: data.profilepicture || "",
        birthday: data.birthday,
        gender: data.gender,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
