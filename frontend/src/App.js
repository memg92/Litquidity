import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation/index";
import * as sessionActions from "./store/session";
import HomePageManager from "./components/HomePageManager";
import PortfoliosPage from "./components/Dashboard/Portfolios";
import StockDetails from "./components/StockDetails/StockDetailPage";
import PortfolioViewPage from "./components/Dashboard/Portfolios/PortfolioViewPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePageManager isLoaded={isLoaded} />
          </Route>
          <Route
            path="/stocks/:symbol"
            render={(props) => <StockDetails {...props} />}
          />
          <Route exact path="/portfolios">
            <PortfoliosPage />
          </Route>
          <Route path="/portfolios/:id">
            <PortfolioViewPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
