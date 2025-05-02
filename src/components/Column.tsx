import { useMemo, useState } from "react";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";

type ColumnProps = {
  state: "PLANNED" | "ONGOING" | "DONE";
};

const Column = ({ state }: ColumnProps) => {
  const tasks = useStore((store) => store.tasks);
  const filtered = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );

  const addTask = useStore((store) => store.addTask)

  return (
    <div className="column">
      <div className="titlewrapper">
        <p>{state}</p>
        <button onClick={() =>{addTask("dcjdj", state)}}>Add</button>
      </div>
      {filtered.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
    </div>
  );
};

export default Column;
