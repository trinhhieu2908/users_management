import React from "react";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import AppLayout from "../components/Layout/Layout";
import UserPage from "../pages/Users/UserPage";
import ProvincePage from "../pages/Provinces/ProvincePage";
import { routes } from "../utils/constants/routes";

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<UserPage />} />
        <Route path={routes.userPath} element={<UserPage />} />
        <Route path={routes.provincePath} element={<ProvincePage />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
