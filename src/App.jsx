import "antd/dist/reset.css";
import AppRoute from "./route/AppRoute";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./configs/configureStore";

function App() {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <AppRoute />
      </ReduxProvider>
    </BrowserRouter>
  );
}

export default App;
