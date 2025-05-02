import { create } from "zustand"

type Task = {
  title: string
  state: "PLANNED" | "ONGOING" | "DONE"
}

type StoreProps = {
  tasks: Task[]
}

const store = (): StoreProps => ({
  tasks: [{ title: "TestTask", state: "PLANNED" }]
})

export const useStore = create<StoreProps>(store)