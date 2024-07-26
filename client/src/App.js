import { Route, Routes } from "react-router-dom";
import { PATHS } from "./Routes/paths.js";
import "./App.css";
import RegisterPage from "./pages/common/RegisterPage/index.js";
import LoginPage from "./pages/common/LoginPage/index.js";
import ReverseAuthRoute from "./Routes/ReverseAuthRoute.js";
import { ProtectedRoute } from "./Routes/ProtectedRoute.js";
import { useSelector } from "react-redux";
import PermissionDenied from "./pages/common/PermissionDenied/index.js";
import AppLayOut from "./Layout/AppLayOut.js";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard.js";
import MyChart from "./MyChart.js";
import ShopLayout from "./Layout/ShopLayout.js";
import { QueryClientProvider, QueryClient } from "react-query";

import {
  adminRoutes,
  vendorRoutes,
  customerRoutes,
  shopRoutes,
} from "./Routes/routes.js";

function App() {
  const queryClient = new QueryClient();
  const role = useSelector((state) => state.appConfig.login);
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <Routes>
        {/* <Route path={PATHS.root} element={<MyChart />} /> */}
        <Route
          path={PATHS.login}
          element={
            <ReverseAuthRoute>
              <LoginPage />
            </ReverseAuthRoute>
          }
        />
        <Route
          path={PATHS.register}
          element={
            <ReverseAuthRoute>
              <RegisterPage />
            </ReverseAuthRoute>
          }
        />

        {adminRoutes.map(({ id, path, defaultRole, Component }) => {
          return (
            <Route
              key={id}
              path={path}
              element={
                <AppLayOut>
                  <ProtectedRoute roleRequired={role} defaultRole={defaultRole}>
                    <Component />
                  </ProtectedRoute>
                </AppLayOut>
              }
            />
          );
        })}

        {vendorRoutes.map(({ id, path, defaultRole, Component }) => {
          return (
            <Route
              key={id}
              path={path}
              element={
                <AppLayOut>
                  <ProtectedRoute
                    roleRequired={role}
                    path={path}
                    defaultRole={defaultRole}
                  >
                    <Component />
                  </ProtectedRoute>
                </AppLayOut>
              }
            />
          );
        })}
        {/* customer routes */}
        {customerRoutes.map(({ id, path, defaultRole, Component }) => {
          return (
            <Route
              key={id}
              path={path}
              element={
                <ProtectedRoute
                  roleRequired={role}
                  path={path}
                  defaultRole={defaultRole}
                >
                  {/* <Component /> */}
                </ProtectedRoute>
              }
            />
          );
        })}
        {shopRoutes.map(({ id, path, Component }) => {
          return (
            <Route
              key={id}
              path={path}
              element={
                <ShopLayout>
                  <Component />
                </ShopLayout>
              }
            />
          );
        })}
        <Route path={PATHS.permissionDenied} element={<PermissionDenied />} />
      </Routes>
     </QueryClientProvider>
    </>
  );
}

export default App;
