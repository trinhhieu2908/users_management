import "antd/dist/reset.css";
import AppRoute from "./route/AppRoute";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
