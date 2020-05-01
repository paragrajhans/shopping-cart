import React from "react";
import { routes } from "./routes";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div>
          <div>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={route.main}
                />
              ))}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
