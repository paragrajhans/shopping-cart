import React from "react";
import Home from "../src/container/Home/Home";

export const routes = [
  {
    path: "/",
    exact: true,
    main: (routeProps) => <Home {...routeProps} />,
  },
];
