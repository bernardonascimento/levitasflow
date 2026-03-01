export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      ministries: {
        Row: {
          id: string;
          name: string;
          slug: string | null;
          owner_user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug?: string | null;
          owner_user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string | null;
          owner_user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      ministry_users: {
        Row: {
          ministry_id: string;
          user_id: string;
          role: Database["public"]["Enums"]["ministry_user_role"];
          created_at: string;
        };
        Insert: {
          ministry_id: string;
          user_id: string;
          role?: Database["public"]["Enums"]["ministry_user_role"];
          created_at?: string;
        };
        Update: {
          ministry_id?: string;
          user_id?: string;
          role?: Database["public"]["Enums"]["ministry_user_role"];
          created_at?: string;
        };
        Relationships: [];
      };
      teams: {
        Row: {
          id: string;
          ministry_id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          ministry_id: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          ministry_id?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      members: {
        Row: {
          id: string;
          ministry_id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          linked_user_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ministry_id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          linked_user_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          ministry_id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          linked_user_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          team_id: string;
          member_id: string;
          permission: Database["public"]["Enums"]["team_member_permission"];
          status: Database["public"]["Enums"]["team_member_status"];
          created_at: string;
        };
        Insert: {
          team_id: string;
          member_id: string;
          permission?: Database["public"]["Enums"]["team_member_permission"];
          status?: Database["public"]["Enums"]["team_member_status"];
          created_at?: string;
        };
        Update: {
          team_id?: string;
          member_id?: string;
          permission?: Database["public"]["Enums"]["team_member_permission"];
          status?: Database["public"]["Enums"]["team_member_status"];
          created_at?: string;
        };
        Relationships: [];
      };
      roles: {
        Row: {
          id: string;
          ministry_id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          ministry_id: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          ministry_id?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      member_roles: {
        Row: {
          member_id: string;
          role_id: string;
        };
        Insert: {
          member_id: string;
          role_id: string;
        };
        Update: {
          member_id?: string;
          role_id?: string;
        };
        Relationships: [];
      };
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
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_ministry_for_current_user: {
        Args: { p_name: string; p_slug: string };
        Returns: string;
      };
    };
    Enums: {
      ministry_user_role: "owner" | "admin" | "member";
      team_member_permission: "admin" | "member";
      team_member_status: "active" | "invited";
    };
  };
};
