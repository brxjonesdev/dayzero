export type Entry = {
  id: number;
  created_at: string; // ISO string for "timestamp with time zone"
  date: string | Date; // ISO string for "timestamp with time zone"
  user_id?: string | null; // Nullable text
  content?: string | null; // Nullable text
  mood?: string | null; // Nullable text
  goal_id?: string | null; // Nullable text
  tags?: Tag[] | null; // Nullable array
  goal?: Goal | null; // Nullable object
};

export type EntryTag = {
  id: number;
  entry_id: bigint;
  tag_id: string;
};

export type Goal = {
  id: number;
  created_at?: string; // ISO string for "timestamp with time zone"
  goal_id: string;
  user_id?: string | null; // Nullable text
  title?: string | null; // Nullable text
  description?: string | null; // Nullable text
};

export type Tag = {
  tag_id: string;
  created_at: string; // ISO string for "timestamp with time zone"
  label?: string | null; // Nullable text
  user_id?: string | null; // Nullable text
  tag?: {
    tag_id: string;
    created_at: string; // ISO string for "timestamp with time zone"
    label?: string | null; // Nullable text
    user_id?: string | null; // Nullable text
  }
};
