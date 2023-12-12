import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

// Create a single supabase client for interacting with your database
const supabaseUrl = "https://ssgctvwerxvozxyjpgdl.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey as string);

export async function getAll() {
    const { data, error } = await supabase.from("conti").select();
    return data;
}

export async function getByKeywords({ keywords }: { keywords: string[] }) {
    const { data, error } = await supabase.from("conti").select("*").or(`keyword.eq.찬양,keyword.eq.감사`);
    return { data, error };
}
