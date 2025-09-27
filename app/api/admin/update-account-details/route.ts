// app/api/admin/update-account-details/route.ts 
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "@/app/store/supabase";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    console.log("API Route: Update account details called");
    
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    
    try {
      decoded = jwt.verify(token, SECRET) as { userId: string; role: string };
    } catch (jwtError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    console.log("Request body:", body);
    
    const { userId, account_balance, account_number, card_number } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // ✅ Keep only balance check
    if (account_balance < 0) {
      return NextResponse.json({ error: "Account balance cannot be negative" }, { status: 400 });
    }

    console.log("Updating Supabase for user:", userId);
    
    // Update user in database (no other validations)
    const { data, error } = await supabase
      .from("citisignup")
      .update({ 
        account_balance,
        account_number,
        card_number
      })
      .eq("id", userId)
      .select();

    console.log("Supabase response - data:", data, "error:", error);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      message: "Account details updated successfully",
      updatedUser: data 
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
