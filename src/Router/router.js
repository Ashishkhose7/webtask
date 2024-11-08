import { createBrowserRouter } from "react-router-dom";
import LayoutComponent from "../Layout/layout";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent  />,
      errorElement: <div>Not Found</div>,  
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  export default router;