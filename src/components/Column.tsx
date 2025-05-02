import { useMemo, useState } from "react";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";

type ColumnProps = {
  state: "PLANNED" | "ONGOING" | "DONE";
};

const Column = ({ state }: ColumnProps) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const tasks = useStore((store) => store.tasks);
  const filtered = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );

  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);
  

  return (
    <div
      className="column"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => {
        console.log(draggedTask)
        if (draggedTask) {
          moveTask(draggedTask, state);
        }
        setDraggedTask(null)
      }}
    >
      <div className="titlewrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {filtered.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContent">
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
