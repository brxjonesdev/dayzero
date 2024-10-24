// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla';

export type Goal = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export type Tag = {
  id: string;
  name: string;
  hex_color: string;
};

export type Entry = {
  id: string;
  date: string;
  goal_id: string;
  tags: Tag[];
  notes: {
    content: string;
    created_at: string;
  }[];
  isPinned: boolean;
};

export type AppState = {
  profile_image: string;
  full_name: string;
  goals: Goal[];
  entries: Entry[];
  custom_tags: Tag[];
  searchQuery: string;
  showPinned: boolean;
};

export type AppActions = {
  addGoal: (goal: Goal) => void;
  setQuery: (query: string) => void;
  removeGoal: (goalId: string) => void;
  addEntry: (entry: Entry) => void;
  deleteEntry: (entryId: string) => void;
  editEntry: (entryId: string, updatedEntry: Entry) => void;
  addCustomTag: (tag: Tag) => void;
  togglePinned: () => void;
};

export type AppStore = AppState & AppActions;

// Default initial state
export const defaultInitState: AppState = {
  profile_image: 'https://i.scdn.co/image/ab6761610000e5ebce4a5e012f67e1197d3676ed',
  full_name: 'Irene Bae Joo-hyun',
  goals: [
    {
      id: '1',
      title: 'Learn React',
      description: 'Study React documentation and build a project',
      completed: false,
    },
  ],
  entries: [
    {
      id: '1',
      date: '2023-01-01',
      goal_id: '1',
      tags: [{ id: '1', name: 'React', hex_color: '#61DAFB' }],
      notes: [
        { content: 'Started learning React today!', created_at: '2023-01-01T10:00:00Z' },
        { content: 'Built a simple app.', created_at: '2023-01-02T10:00:00Z' },
      ],
      isPinned: false,
    },
  ],
  custom_tags: [
    {
      id: '1',
      name: 'Learning',
      hex_color: '#FFD700',
    },
    {
      id: '2',
      name: 'Personal',
      hex_color: '#FF69B4',
    },
  ],
  searchQuery: '',
  showPinned: false,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
    togglePinned: () => set((state) => ({ showPinned: !state.showPinned })),
    setQuery: (query) => set({ searchQuery: query }),
    removeGoal: (goalId) => set((state) => ({ goals: state.goals.filter((g) => g.id !== goalId) })),
    addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
    addCustomTag: (tag) => set((state) => ({ custom_tags: [...state.custom_tags, tag] })),
    deleteEntry: (entryId) =>
      set((state) => ({ entries: state.entries.filter((e) => e.id !== entryId) })),
    editEntry: (entryId, updatedEntry) =>
      set((state) => ({
        entries: state.entries.map((entry) => (entry.id === entryId ? updatedEntry : entry)),
      })),
  }));
};
