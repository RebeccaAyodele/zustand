import { useMemo } from "react";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";

type ColumnProps = {
  state: "PLANNED" | "ONGOING" | "DONE";
};

const Column = ({ state }: ColumnProps) => {
  const tasks = useStore((store) =>
    store.tasks
  );
  const filtered = useMemo(() => tasks.filter((task) => task.state === state),[tasks, state])
  return (
    <div className="column">
      <p>{state}</p>
      {filtered.map((task)=><Task title={task.title} key={task.title} />)}
    </div>
  );
};

export default Column;
