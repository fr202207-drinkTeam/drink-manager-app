import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { AdminRouter } from "./AdminRouter";
import { UserRouter } from "./UserRouter";

// import { MainMock } from "../components/pages/MainMock";
import Login from "../components/pages/Login";
import AdminLogin from "../components/pages/AdminLogin";
import AdminHome from "../components/pages/AdminHome";
import Register from "../components/pages/Register";
import Top from "../components/pages/Top";
import DefaultLayout from "../components/layout/DefaultLayout";
// ヘッダー不必要のため仮置
import Faq from "../components/pages/Faq";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../hooks/useLoginUserFetch";
import { useEffect, useState } from "react";

const MainRoute = [
  // {
  //   path: "/main",
  //   element: <MainMock />,
  // },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/adminhome",
    element: <AdminHome />,
  },
  {
    path: "/home",
    element: <Top />,
  },
  // ヘッダー不必要のため仮置
  {
    path: "/faq",
    element: <Faq />,
  },
];

export const MainRouter = () => {
  //Cookie
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        {MainRoute.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {/* adminhome配下のルーティング */}
        {AdminRouter.map((route, index) => (
          <Route
            key={index}
            path={`/adminhome${route.path}`}
            element={
              authId && loginUser.isAdmin ? (
                <DefaultLayout>{route.element}</DefaultLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        ))}
        {/* home配下のルーティング */}
        {UserRouter.map((route, index) => (
          <Route
            key={index}
            path={`/home${route.path}`}
            element={
              authId ? (
                <DefaultLayout>{route.element}</DefaultLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        ))}
      </Routes>
    </>
  );
};
