import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import {
  createStrategyConfig,
  StrategyConfig,
} from "@/models/StrategyConfigModel";

export async function GET() {
  const { data, error } = await supabase
    .from("StrategyConfig")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // ✅ Pakai NextResponse di sini juga
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body: StrategyConfig = await request.json();

    // Validasi sederhana
    if (
      !body.symbol ||
      !body.timeframe ||
      body.plusDI === undefined ||
      body.minusDI === undefined ||
      body.adx === undefined ||
      body.takeProfit === undefined ||
      body.stopLoss === undefined ||
      !body.leverage
    ) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const result = await createStrategyConfig(body);
    return NextResponse.json(
      { message: "Berhasil disimpan", data: result },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Gagal menyimpan data:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Unknown error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan tak dikenal" },
      { status: 500 }
    );
  }
}
