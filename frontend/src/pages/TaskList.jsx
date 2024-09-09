import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../taskSlice";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    const fetchTasksAfterDelay = () => {
      const delay = 1000; // 1 second
      const timer = setTimeout(() => {
        dispatch(fetchTasks());
      }, delay);
      return () => clearTimeout(timer);
    };

    fetchTasksAfterDelay();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <Grid container spacing={2} className="p-4">
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={task.id}>
              <ListItemIcon>
                {index + 1}
              </ListItemIcon>
              <ListItemText primary={task.title} secondary={task.description} />
              <Button
                onClick={() => handleDeleteTask(task.id)}
                className="ml-2 text-red-500"
              >
                Delete
              </Button>
              <Link to={`edit-task/${task.id}`} className="ml-2 text-blue-500">
                Edit
              </Link>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Link to="create-task" className="mb-4 p-2 bg-blue-500 text-white">
          Create Task
        </Link>
      </Grid>
    </Grid>
  );
};

export default TaskList;