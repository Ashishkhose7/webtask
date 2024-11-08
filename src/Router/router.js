import { createBrowserRouter } from "react-router-dom";
import LayoutComponent from "../Layout/layout";
import Home from "../pages/Home";
import About from "../pages/About";

const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent  />,
      // errorElement: <div>Not Found</div>,  
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "about",
          element: <About/>,
        },
      ],
    },
  ]);

  export default router;