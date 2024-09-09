import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTask, fetchTasks } from "../taskSlice";
import { Grid, TextField, Button, Typography } from "@material-ui/core";

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasks);

  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    } else {
      const task = tasks.find((t) => t.id === Number(id));
      if (task) {
        setTask(task);
      }
    }
  }, [id, tasks, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id, updatedTask: task }));
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <Grid container spacing={2} className="p-4">
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Task
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Task Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Task Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Update Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditTask;