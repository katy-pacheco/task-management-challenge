import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page/error-page";
import App from "../App";
import NotFoundPage from "../pages/not-found-page/not-found-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
