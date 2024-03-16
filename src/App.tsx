import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";

function App() {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ToastContainer />
          {token ? <Layout /> : <Navigate to="/login" replace />}
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <ToastContainer />
          <Login />
        </>
      ),
    },
    {
      path: "/jobs",
      element: (
        <>
          <ToastContainer />
          <Layout />
        </>
      ),
    },
    {
      path: "/user",
      element: (
        <>
          <ToastContainer />
          {token ? <Layout /> : <Navigate to="/login" replace />}
        </>
      ),
      children: [
        {
          path: ":id",
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
