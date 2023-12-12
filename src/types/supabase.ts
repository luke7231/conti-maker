export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            conti: {
                Row: {
                    bridge: number | null;
                    created_at: string;
                    etc: Json | null;
                    highlight: number | null;
                    id: number;
                    img: string | null;
                    isUpTempo: boolean | null;
                    keyword: string;
                    "pre-corus": number | null;
                    title: string | null;
                    verse: number | null;
                    youtube_link: string | null;
                };
                Insert: {
                    bridge?: number | null;
                    created_at?: string;
                    etc?: Json | null;
                    highlight?: number | null;
                    id?: number;
                    img?: string | null;
                    isUpTempo?: boolean | null;
                    keyword: string;
                    "pre-corus"?: number | null;
                    title?: string | null;
                    verse?: number | null;
                    youtube_link?: string | null;
                };
                Update: {
                    bridge?: number | null;
                    created_at?: string;
                    etc?: Json | null;
                    highlight?: number | null;
                    id?: number;
                    img?: string | null;
                    isUpTempo?: boolean | null;
                    keyword?: string;
                    "pre-corus"?: number | null;
                    title?: string | null;
                    verse?: number | null;
                    youtube_link?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            keyword: "찬양" | "고백" | "간구" | "은혜" | "감사" | "축복" | "위로" | "사랑";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
export type Conti = Database["public"]["Tables"]["conti"]["Row"];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"])
      ? (Database["public"]["Tables"] & Database["public"]["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
      ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
      ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
      ? Database["public"]["Enums"][PublicEnumNameOrOptions]
      : never;
