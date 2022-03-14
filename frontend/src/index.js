import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { BudgetsProvider } from "./components/Budget/BudgetsContext";

ReactDOM.render(
  <Provider store={store}>
    <BudgetsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BudgetsProvider>
  </Provider>,
  document.getElementById("root")
);
