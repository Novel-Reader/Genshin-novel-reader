import { useRouteError } from "react-router-dom";
import './css/error-page.css';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page" className="d-flex center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
