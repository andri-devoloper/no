import { supabase } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  const { data, error } = await supabase
    .from("Order")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
