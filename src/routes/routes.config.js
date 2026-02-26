import { Outlet } from "react-router-dom";
import routesConstants from "./routesConstants";
import { Contacts } from "./routeImports";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import HomePage from "../pages/dashboard";
const routesConfig = {
  common: [],
  private: [
    {
      path: routesConstants.CONTACTS,
      component: Outlet,
      children: [{ index: true, component: Contacts }],
    },
    {
      path: routesConstants.DASHBOARD,
      component: HomePage,
    },
  ],
  public: [
    {
      path: routesConstants.LOGIN,
      component: LoginPage,
    },
    {
      path: "/register",
      component: RegisterPage,
    },
  ],
};

export default routesConfig;
