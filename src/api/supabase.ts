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

export async function getByKeyword({ keyword }: { keyword: string }) {
    const data = await supabase.from("random_song").select("*").eq("keyword", keyword).limit(5);
    return { data: data.data, error: data.error };
}

export async function getControlled() {
    const { data, error } = await supabase.from("conti").select("*").not("verse", "is", null);
    return { data, error };
}
