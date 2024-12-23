import { createRoot } from "react-dom/client";
import Router from "./router";
import "./css/common.css";

// ReactDOM.render is no longer supported in React 18.
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
const container = document.getElementById("root");

const root = createRoot(container);

root.render(Router);
