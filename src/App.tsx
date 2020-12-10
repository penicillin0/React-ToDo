import React from "react";
import { ThemeProvider, createTheme } from "ingred-ui";
import "./App.css";
import { TaskList } from "./pages/TaskList";
import { Provider } from "react-redux";
import { cofigureStore } from "./store";
import Header from "./components/Header";

function App() {
  const theme = createTheme();
  const store = cofigureStore();
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header />
          <TaskList></TaskList>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
