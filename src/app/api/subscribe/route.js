import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ success: true, message: "Subscribed successfully!" }, { status: 201 });
    }
    
    const { error } = await supabase
      .from("subscribers")
      .insert([{ email }])
      .select()
      .single();

    if (error && error.code === "23505") {
      return NextResponse.json({ success: true, message: "Already subscribed!" }, { status: 200 });
    }

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Subscribed successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
