import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("welcome", "routes/welcome.tsx", [
    index("routes/welcome/index.tsx"),
    route(":type", "routes/welcome/details.tsx"),
  ]),
  route("table", "routes/table.tsx"),
] satisfies RouteConfig;
