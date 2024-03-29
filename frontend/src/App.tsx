import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Trainers from "./pages/Trainers/Trainers";
import ProgramPage from "./pages/Program";
import UserAccount from "./pages/dashboard/user-account/UserAccount";
import Dashboard from "./pages/dashboard/trainer-account/Dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import TrainerDetails from "./pages/Trainers/TrainerDetail";
import CheckoutSuccess from "./pages/CheckoutSuccess";

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
      {
        path: "/checkout-success",
        element: <CheckoutSuccess />,
      },
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
