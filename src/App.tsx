import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
