import type { Route } from "./+types/home";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader() {
  return redirect("/welcome");
}

export default function Home() {
  // This component shouldn't render due to the redirect
  return null;
}
