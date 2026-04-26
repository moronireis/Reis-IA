export type UserRole = 'expert' | 'closer' | 'student';
export type CallResult = 'sold' | 'lost' | 'no_show';
export type ActionStatus = 'todo' | 'in_progress' | 'done';
export type SaleStatus = 'confirmed' | 'pending' | 'refunded';
export type JourneyType = 'expert' | 'student';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: UserRole;
          avatar: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      students: {
        Row: {
          id: string;
          user_id: string;
          level: number;
          points: number;
          revenue: number;
          joined_at: string;
        };
        Insert: Omit<Database['public']['Tables']['students']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['students']['Insert']>;
      };
      closers: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['closers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['closers']['Insert']>;
      };
      sales: {
        Row: {
          id: string;
          closer_id: string;
          student_id: string;
          amount: number;
          status: SaleStatus;
          date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['sales']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['sales']['Insert']>;
      };
      calls: {
        Row: {
          id: string;
          closer_id: string;
          date: string;
          result: CallResult;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['calls']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['calls']['Insert']>;
      };
      closer_reviews: {
        Row: {
          id: string;
          closer_id: string;
          hits: string;
          misses: string;
          blind_spots: string;
          improvements: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['closer_reviews']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['closer_reviews']['Insert']>;
      };
      journey_steps: {
        Row: {
          id: string;
          title: string;
          description: string;
          step_order: number;
          type: JourneyType;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['journey_steps']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['journey_steps']['Insert']>;
      };
      journey_progress: {
        Row: {
          id: string;
          user_id: string;
          step_id: string;
          completed: boolean;
          completed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['journey_progress']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['journey_progress']['Insert']>;
      };
      checklist_items: {
        Row: {
          id: string;
          student_id: string;
          title: string;
          completed: boolean;
          category: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['checklist_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['checklist_items']['Insert']>;
      };
      actions: {
        Row: {
          id: string;
          title: string;
          description: string;
          how: string;
          due_date: string | null;
          status: ActionStatus;
          assigned_to: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['actions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['actions']['Insert']>;
      };
      metrics_cache: {
        Row: {
          id: string;
          type: string;
          data: Record<string, unknown>;
          period: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['metrics_cache']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['metrics_cache']['Insert']>;
      };
    };
  };
}
