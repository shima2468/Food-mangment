import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import ChangePass from "./modules/Authentication/Components/Change-pass/ChangePass";
import ForgetPass from "./modules/Authentication/Components/Forget-pass/ForgetPass";
import LogOut from "./modules/Authentication/Components/LogOut/LogOut";
import Register from "./modules/Authentication/Components/Register/Register";
import ResetPass from "./modules/Authentication/Components/Reset-pass/ResetPass";
import VerifyAccount from "./modules/Authentication/Components/Verify-account/VerifyAccount";
import CategoriesList from "./modules/Categories/CategoriesList/CategoriesList";
import CategoryData from "./modules/Categories/CategoryData/CategoryData";
import Dashboard from "./modules/Dashboard/Components/Dashboard/Dashboard";
import FavList from "./modules/Favourites/Components/FavList/FavList";
import RecipeData from "./modules/Recipes/Components/RecipeData/RecipeData";
import RecipesList from "./modules/Recipes/Components/RecipesList/RecipesList";
import AuthenticationLayout from "./modules/Shared/Components/AuthenticationLayout/AuthenticationLayout";
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout";
import NotFound from "./modules/Shared/Components/NotFound/NotFound";
import ProtectedRoute from "./modules/Shared/Components/ProtectedRoute/ProtectedRoute";
import UsersList from "./modules/Users/Components/UsersList/UsersList";
import Login from "./modules/Authentication/Components/Login/Login";

function App() {
  const routes = createBrowserRouter(
    [
      {
        path: "",
        element: <AuthenticationLayout />,
        children: [
          { index: true, element: <Login /> },
          { path: "Log-in", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "reset-pass", element: <ResetPass /> },
          { path: "forget-pass", element: <ForgetPass /> },
          { path: "verify-account", element: <VerifyAccount /> },
        ],
        errorElement: <NotFound />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <MasterLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "recipes", element: <RecipesList /> },
          { path: "recipe-Data", element: <RecipeData /> },
          { path: "categories", element: <CategoriesList /> },
          { path: "category-Data", element: <CategoryData /> },
          { path: "users", element: <UsersList /> },
          { path: "fav", element: <FavList /> },
          { path: "logout", element: <LogOut /> },
          { path: "change-pass", element: <ChangePass /> },
        ],
        errorElement: <NotFound />,
      },
    ],
    {
      // basename: "/Food-mangment", 
    }
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
