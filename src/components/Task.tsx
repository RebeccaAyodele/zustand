import { useStore } from "../store";
import "./Task.css";
import classNames from "classnames";
import trashIcon from "../assets/trash.png"

type TaskProps = {
  title: string;
};

const Task = ({ title }: TaskProps) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const deleteTask = useStore(store=>store.deleteTask)

  return (
    <div className="task">
      <div>{task?.title}</div>
      <div>
        <div className="bottomrapper">
          <div><img src={trashIcon} alt="Delete" onClick={() => {
            if (task) deleteTask(task.title)
          }} style={{ width: "18px", height: "18px" }} /></div>
          <div className={classNames("status", task?.state)}>{task?.state}</div>
        </div>
      </div>
    </div>
  );
};

export default Task;
