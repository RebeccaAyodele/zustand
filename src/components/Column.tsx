import "./Column.css"

type ColumnProps = {
    state: string;
}

const Column = ({ state }: ColumnProps) => {
  return (
    <div className="column">{state}</div>
  )
}

export default Column