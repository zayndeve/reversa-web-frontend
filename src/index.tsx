import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/screens/store";
import App from "./app/screens/App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./app/MaterialTheme";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalContext } from "./app/hooks/useGlobal";
import { Member } from "./app/libs/types/member";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authMember, setAuthMember] = React.useState<Member | null>(null);
  const [orderBuilder, setOrderBuilder] = React.useState<Date>(new Date());

  return (
    <GlobalContext.Provider value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}>
      {children}
    </GlobalContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </Provider>
    </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
