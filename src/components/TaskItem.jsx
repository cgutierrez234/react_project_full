const TaskItem = ({ task, setCurrentTask }) => {
  const handleClick = (e) => {
    setCurrentTask(task);
  };
  return (
    <div className="card" onClick={handleClick} id={task.id}>
      <h1>{task.task}</h1>
    </div>
  );
};

export default TaskItem;
