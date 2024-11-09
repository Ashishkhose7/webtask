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
  ],
  {
    // Opt into React Router v7 transition behavior
    future: {
      v7_startTransition: true,  // Enable startTransition in React Router v7
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
    },
  });

  export default router;