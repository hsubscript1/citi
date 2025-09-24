import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/app/store/supabase";

export async function POST(req: Request) {
  try {
    const { fname, lname, email, password } = await req.json();
    console.log("Incoming signup request:", { fname, lname, email });

    if (!fname || !lname || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("citisignup")
      .select("id")
      .eq("email", email)
      .single();

    console.log("Existing user check:", { existingUser, fetchError });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Supabase fetch error:", fetchError);
      throw fetchError;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: insertData, error: dbError } = await supabase
      .from("citisignup")
      .insert([{ fname, lname, email, password: hashedPassword }])
      .select();

    console.log("Insert result:", { insertData, dbError });

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Signup successful", user: insertData }, { status: 201 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
