import "./Column.css";
import Task from "./Task";

type ColumnProps = {
    state: string;
}

const Column = ({ state }: ColumnProps) => {
  return (
    <div className="column">
        <p>{state}</p>
        <Task title="Todo" />
    </div>
  )
}

export default Column