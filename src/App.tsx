import React from "react";
import { ThemeProvider, createTheme } from "ingred-ui";
import "./App.css";
import { TaskList } from "./pages/TaskList";
import { Provider } from "react-redux";
import { cofigureStore } from "./store";

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
  const store = cofigureStore();
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskList tasks={tasks}></TaskList>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
