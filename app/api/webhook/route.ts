import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { createOrder } from "@/models/OrderModel";
import { getCurrentPrice } from "@/lib/binanceService";

const defaultConfig = {
  plusDI: 20,
  minusDI: 20,
  adx: 25,
  symbol: "BTCUSDT",
  takeProfit: 2,
  stopLoss: 1,
  leverage: "10x",
  timeframe: "5m",
};

// GET handler
export async function GET() {
  const { data, error } = await supabase
    .from("Order")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST handler
export async function POST(req: NextRequest) {
  const signal = await req.json();

  const { data: configs, error: configError } = await supabase
    .from("Order")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);

  if (configError) {
    return NextResponse.json(
      { error: "Gagal ambil konfigurasi strategi." },
      { status: 500 }
    );
  }

  const configRaw = configs?.[0] ?? {};
  const config = {
    ...defaultConfig,
    ...configRaw,
    plusDI: Number(configRaw.plusDI ?? defaultConfig.plusDI),
    minusDI: Number(configRaw.minusDI ?? defaultConfig.minusDI),
    adx: Number(configRaw.adx ?? defaultConfig.adx),
    takeProfit: Number(configRaw.takeProfit ?? defaultConfig.takeProfit),
    stopLoss: Number(configRaw.stopLoss ?? defaultConfig.stopLoss),
  };

  let action: "BUY" | "SELL" | null = null;

  // DEBUG LOG
  console.log("Signal received:", signal);
  console.log("Config used:", config);

  if (
    signal.plusDI > config.plusDI &&
    signal.minusDI < config.minusDI &&
    signal.adx >= config.adx
  ) {
    action = "BUY";
  } else if (
    signal.plusDI < config.plusDI &&
    signal.minusDI > config.minusDI &&
    signal.adx >= config.adx
  ) {
    action = "SELL";
  }

  if (!action) {
    return NextResponse.json(
      { message: "Invalid signal, no action taken." },
      { status: 400 }
    );
  }

  try {
    const symbol = signal.symbol || config.symbol;
    const price_entry = await getCurrentPrice(symbol);
    const tp = price_entry * (1 + config.takeProfit / 100);
    const sl = price_entry * (1 - config.stopLoss / 100);

    const newOrder = {
      id: uuidv4(),
      symbol,
      action,
      price_entry: parseFloat(price_entry.toFixed(2)),
      tp_price: parseFloat(tp.toFixed(2)),
      sl_price: parseFloat(sl.toFixed(2)),
      leverage: config.leverage,
      timeframe: config.timeframe,
      timestamp: new Date().toISOString(),
    };

    const savedOrder = await createOrder(newOrder);

    return NextResponse.json({
      message: "Order saved successfully.",
      order: savedOrder,
    });
  } catch (err: unknown) {
    // Safe type guard for error object
    if (err instanceof Error) {
      return NextResponse.json(
        {
          error: err.message,
        },
        { status: 500 }
      );
    }

    // Fallback if not instance of Error
    return NextResponse.json(
      {
        error: "Unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
