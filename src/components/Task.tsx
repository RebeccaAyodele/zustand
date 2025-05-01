import "./Task.css";
import classNames from "classnames";

const STATUS = "PLANNED";

type TaskProps = {
  title: string;
};

const Task = ({ title }: TaskProps) => {
  return (
    <div className="task">
        <div>{title}</div>
        <div>
            <div className="bottomrapper"></div>
            <div className={classNames('status', STATUS)}>{STATUS}</div>
        </div>
    </div>
  )
};

export default Task;
