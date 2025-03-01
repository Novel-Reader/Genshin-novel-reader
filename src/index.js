import { createRoot } from "react-dom/client";
import Router from "./router";
import "./css/common.css";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(Router);
