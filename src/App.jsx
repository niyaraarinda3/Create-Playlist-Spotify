import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getToken } from "./Auth/auth";
import Home from "./pages/home/index";
import LoginPage from "./pages/login/index";
import TokenContext from "./context/TokenContext";

const App = () => {
  const [token, setToken] = useState("");
  const value = useMemo(() => ({ token, setToken }), [token]);

  useEffect(() => {
    if (!token) {
      setToken(getToken());
    }
  }, []);

  return (
    <TokenContext.Provider value={value}>
      <Router>
        <Switch>
          <Route path="/create-playlist">
            {!token ? (
              <Redirect exact from="/create-playlist" to="/" />
            ) : (
              <Home />
            )}
          </Route>
          <Route path="/">
            {token ? (
              <Redirect exact from="/" to="/create-playlist" />
            ) : (
              <LoginPage />
            )}
          </Route>
        </Switch>
      </Router>
    </TokenContext.Provider>
  );
};

export default App;
