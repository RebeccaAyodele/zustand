import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Task = {
  title: string;
  state: "PLANNED" | "ONGOING" | "DONE";
};

type StoreProps = {
  tasks: Task[];
  draggedTask: string | null;
  addTask: (title: string, state: Task["state"]) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | null) => void;
  moveTask: (title: string, state: Task["state"]) => void;
};

export const useStore = create<StoreProps>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        draggedTask: null,
        addTask: (title, state) =>
          set((store) => ({
            tasks: [...store.tasks, { title, state }],
          })),
        deleteTask: (title) =>
          set((store) => ({
            tasks: store.tasks.filter((task) => task.title !== title),
          })),
        setDraggedTask: (title) => set({ draggedTask: title }),
        moveTask: (title, state) =>
          set((store) => ({
            tasks: store.tasks.map((task) =>
              task.title === title ? { ...task, state } : task
            ),
          })),
      }),
      {
        name: "task-storage", // used by persist in localStorage
      }
    )
    // devtools has no name config here — it uses the store's name by default or shows "anonymous"
  )
);
