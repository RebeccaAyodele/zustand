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

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      console.log("State update:", ...args);
      set(...args);
    },
    get,
    api
  );


export const useStore = create<StoreProps>()(
  log(
    devtools(
    persist(
      (set) => ({
        tasks: [],
        draggedTask: null,
        addTask: (title: string, state: Task["state"]) =>
          set((store: StoreProps) => ({
            tasks: [...store.tasks, { title, state }],
          })),
        deleteTask: (title: string) =>
          set((store: StoreProps) => ({
            tasks: store.tasks.filter((task) => task.title !== title),
          })),
        setDraggedTask: (title: string) => set({ draggedTask: title }),
        moveTask: (title: string, state: Task["state"]) =>
          set((store: StoreProps) => ({
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
  )
);
