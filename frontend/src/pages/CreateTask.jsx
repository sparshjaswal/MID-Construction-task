import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../taskSlice";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@material-ui/core";

const CreateTask = () => {
  const [task, setTask] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(task));
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
          Create Task
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
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateTask;