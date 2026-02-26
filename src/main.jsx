import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/style.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import toasterConfig from "./components/constants/config.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate 
        loading={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        } 
        persistor={persistor}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster {...toasterConfig} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
