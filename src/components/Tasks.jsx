import TaskItem from "./TaskItem";

const Tasks = ({ tasks, setCurrentTask }) => {
  return tasks.map((task) => (
    <TaskItem task={task} key={task.id} setCurrentTask={setCurrentTask} />
  ));
};

export default Tasks;
