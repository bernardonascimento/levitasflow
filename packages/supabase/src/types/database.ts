export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          fullName: string | null;
          createdAt: string;
        };
        Insert: {
          id: string;
          fullName?: string | null;
          createdAt?: string;
        };
        Update: {
          id?: string;
          fullName?: string | null;
          createdAt?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
