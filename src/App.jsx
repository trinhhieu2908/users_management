import "antd/dist/reset.css";
import AppRoute from "./route/AppRoute";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "react-query";
import store from "./configs/configureStore";
import { queryClient } from "./utils/query-client";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <AppRoute />
        </ReduxProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
