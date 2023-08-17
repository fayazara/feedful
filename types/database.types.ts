export interface Database {
  public: {
    Tables: {
      feeds: {
        Row: {
          created_at: string
          description: string | null
          id: number
          icon: string | null
          meta: any | null
          name: string | null
          type: string
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          icon?: string | null
          meta?: any | null
          name?: string | null
          type: string
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          icon?: string | null
          meta?: any | null
          name?: string | null
          type?: string
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feeds_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
