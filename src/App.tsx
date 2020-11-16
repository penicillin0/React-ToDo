import React from "react";
import { ThemeProvider, createTheme } from "ingred-ui";
import "./App.css";
import TaskList from "./pages/TaskList";

function App() {
  const theme = createTheme();
  const tasks = [
    {
      id: 1,
      title: "A",
    },
    {
      id: 2,
      title: "B",
    },
  ];
  return (
    <div>
      <ThemeProvider theme={theme}>
        <TaskList tasks={tasks}></TaskList>
      </ThemeProvider>
    </div>
  );
}

export default App;
