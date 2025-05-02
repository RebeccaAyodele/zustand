import { useStore } from "../store";
import "./Task.css";
import classNames from "classnames";

type TaskProps = {
  title: string;
};

const Task = ({ title }: TaskProps) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  return (
    <div className="task">
      <div>{task?.title}</div>
      <div>
        <div className="bottomrapper">
          <div className={classNames("status", task?.state)}>{task?.state}</div>
        </div>
      </div>
    </div>
  );
};

export default Task;
