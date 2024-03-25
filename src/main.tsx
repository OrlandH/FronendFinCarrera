import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Pacientes from "./routes/Pacientes.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Especialidad from "./routes/Especialidad.tsx";

import "./index.css";
import Citas from "./routes/Citas.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/pacientes",
        element: <Pacientes />,
      },
      {
        path: "/pacientes/crear",
        element: <Pacientes />,
      },
      {
        path: "/especialidad",
        element: <Especialidad />,
      },
      {
        path: "/citas",
        element: <Citas />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
