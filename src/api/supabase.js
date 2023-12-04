import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseUrl = "https://ssgctvwerxvozxyjpgdl.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAll() {
    const { data, error } = await supabase.from("conti").select();
    return data;
}
