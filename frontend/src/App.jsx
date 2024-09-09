// src/App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import TaskList from "./pages/taskList.jsx";
import CreateTask from "./pages/createTask.jsx";
import EditTask from "./pages/EditTask";

function App() {
  const isLoading = useSelector((state) => state.tasks.isLoading);

  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </div>
        }
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<TaskListLayout />}>
              <Route path="create-task" element={<CreateTask />} />
              <Route path="edit-task/:id" element={<EditTask />} />
            </Route>
          </Routes>
        )}
      </Suspense>
    </Router>
  );
}

function TaskListLayout() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-4 max-w-md">
        <TaskList />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
