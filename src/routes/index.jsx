import { Suspense } from "react";
import { useSelector } from "react-redux";
import Layout from "../layout";
import routesConfig from "./routes.config";
import Loader from "../components/common/loaders/Loader";
import NotFoundPage from "../components/common/NotFoundPage";
import { selectIsAuthenticated } from "../pages/login/Slice/authSlice";
import {
  Routes as ReactRouterDomRoutes,
  Route,
  Navigate,
} from "react-router-dom";

const Common = (route) => (
  <Suspense fallback={<Loader />}>
    <route.component />
  </Suspense>
);

const ProtectedComponent = (route) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <route.component />
    </Suspense>
  );
};

const createNestedRoutes = (routes, RouteType) => {
  return routes.map((route, i) => {
    if (route.component === Navigate) {
      return (
        <Route
          key={i}
          path={route.path}
          element={<Navigate to={route.to} replace />}
        />
      );
    }
    if (route.children) {
      return (
        <Route path={route.path} key={i} element={<RouteType {...route} />}>
          {createNestedRoutes(route.children, RouteType)}
        </Route>
      );
    } else {
      return (
        <Route
          key={i}
          index={route.index}
          path={route.path}
          element={<RouteType {...route} />}
        />
      );
    }
  });
};

const Routes = () => {
  const { common, private: privateRoutes, public: publicRoutes } = routesConfig;

  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {createNestedRoutes(publicRoutes, Common)}
      <Route element={<Layout />}>
        {createNestedRoutes(privateRoutes, ProtectedComponent)}
      </Route>
      {createNestedRoutes(common, Common)}
      <Route path="*" element={<NotFoundPage />} />
    </ReactRouterDomRoutes>
  );
};

export default Routes;
