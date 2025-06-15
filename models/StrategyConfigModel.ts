import { supabase } from "@/lib/supabaseClient";

export type StrategyConfig = {
  id?: number;
  symbol: string;
  timeframe: string;
  plusDI: number;
  minusDI: number;
  adx: number;
  takeProfit: number;
  stopLoss: number;
  leverage: string;
  createdAt?: string;
};

export async function createStrategyConfig(config: StrategyConfig) {
  const { data, error } = await supabase
    .from("StrategyConfig")
    .insert([config])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getLatestStrategyConfig(): Promise<StrategyConfig | null> {
  const { data, error } = await supabase
    .from("StrategyConfig")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Failed to fetch latest config:", error.message);
    return null;
  }

  return data?.[0] || null;
}
