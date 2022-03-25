import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/index";

import AppRoutes from "./AppRoutes";
import FrontLayout from "layouts/FrontLayout";
import AuthLayout from "layouts/AuthLayout";
import { useAppContext } from "context/app.context";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "utils/constants";
import RegisterPage from "pages/RegisterPage";

const RouterComp = () => {
  const { user } = useAppContext();
  const token = Cookies.get(TOKEN_NAME);

  if (!user && token) return <div>Loading...</div>;
  const isAuth = Boolean(token && user);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppRoutes
              isAuth={isAuth}
              isProtected={true}
              component={HomePage}
              layout={FrontLayout}
            />
          }
        />
        <Route
          path="/login"
          element={
            <AppRoutes
              isAuth={isAuth}
              isProtected={false}
              component={LoginPage}
              layout={AuthLayout}
            />
          }
        />
        <Route
          path="/register"
          element={
            <AppRoutes
              isAuth={isAuth}
              isProtected={false}
              component={RegisterPage}
              layout={AuthLayout}
            />
          }
        />
      </Routes>
    </Router>
  );
};
export default RouterComp;
