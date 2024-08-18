import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
    <PersistGate persistor={persistor} loading={null}>
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);
