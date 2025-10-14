import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/app/store/supabase";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET) as { userId: string; role: string };

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { userId, newBalance } = await req.json();

    if (newBalance < 0) {
      return NextResponse.json({ error: "Balance cannot be negative" }, { status: 400 });
    }

    const { error } = await supabase
      .from("citisignup")
      .update({ account_balance: newBalance })
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Balance set successfully" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}