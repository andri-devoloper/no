// models/OrderModel.ts
import { supabase } from "@/lib/supabaseClient";

export interface Order {
  id?: string; // UUID
  symbol: string;
  action: "BUY" | "SELL";
  price_entry: number;
  tp_price: number;
  sl_price: number;
  leverage: string;
  timeframe: string;
  timestamp: string;
}

export async function createOrder(order: Omit<Order, "id">) {
  const { data, error } = await supabase
    .from("Order")
    .insert([order])
    .select();

  if (error) {
    console.error("Supabase insert error:", error.message);
    throw {
      message: "Failed to save order to database.",
      detail: error.details,
      full: error,
    };
  }

  return data;
}
