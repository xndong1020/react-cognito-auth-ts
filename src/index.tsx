import React from "react";
import ReactDOM from "react-dom/client";
import "bulma/css/bulma.min.css";
import App from "./App";
import { Amplify } from "aws-amplify";
import { config } from "./config";
import reportWebVitals from "./reportWebVitals";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { AuthContextProvider } from "./contexts/AuthContext";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GlobalContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </GlobalContextProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
reportWebVitals();
