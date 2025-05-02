import { create } from "zustand"

type Task = {
  title: string
  state: "PLANNED" | "ONGOING" | "DONE"
}

type StoreProps = {
  tasks: Task[];
  addTask: (title: string, state: Task["state"]) => void
  deleteTask: (title: string) => void
  draggedTask: string | null
  setDraggedTask: (title: string | null) => void
  moveTask: (title: string, state: Task["state"]) => void;
}

// Task["state"] is a union of string literal and it's another way of writing "PLANNED" | "ONGOING" | "DONE"

export const useStore = create<StoreProps>((set) => ({
  tasks: [{ title: "TestTask", state: "PLANNED" }],
  draggedTask: null,
  addTask: (title, state) =>
    set((store) => ({
      tasks: [...store.tasks, { title, state }]
    })),

    deleteTask: (title: string) =>
    set((store) => ({
      tasks: store.tasks.filter((task)=>task.title !== title)
    })),
    
    setDraggedTask: (title: string  | null) => set({draggedTask: title}),
    moveTask: (title: string, state: Task["state"]) =>
    set((store) => ({
    tasks: store.tasks.map((task) =>
      task.title === title ? { ...task, state } : task
    ),
  })),
}));

// set lets you update the store, when you call set with a function, Zustand gives you the current state of the store — that’s what store is.