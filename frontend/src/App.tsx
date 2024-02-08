import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Trainers from "./pages/Trainers/Trainers";
import ErrorPage from "./pages/ErrorPage";
import ProgramPage from "./pages/Program";
import UserAccount from "./pages/dashboard/user-account/UserAccount";
import Dashboard from "./pages/dashboard/trainer-account/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Profile from "./pages/dashboard/user-account/Profile";
import TrainerDetails from "./pages/Trainers/TrainerDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "trainers",
        element: <Trainers />,
      },
      {
        path: "trainers/:id",
        element: <TrainerDetails />,
      },
      // {
      //   path: "test",
      //   element: <Trainers />,
      // },
      // {
      //   path: "test/:id",
      //   element: <TrainerDetails />,
      // },
      {
        path: "program",
        element: <ProgramPage />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "member/profile/me",
        element: (
          <ProtectedRoutes allowedRoles={["member"]}>
            <UserAccount />
          </ProtectedRoutes>
        ),
      },
      {
        path: "trainer/profile/me",
        element: (
          <ProtectedRoutes allowedRoles={["trainer"]}>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
