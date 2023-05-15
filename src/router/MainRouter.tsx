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
import ScrollTop from "../components/atoms/ScrollTop";
import NotFound from "../components/pages/NotFound";
const MainRoute = [
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
    path: "/",
    element: <NotFound />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
  // ヘッダー不必要のため仮置
  {
    path: "/faq",
    element: <Faq />,
  },
];

export const MainRouter = (props:any) => {
  //Cookie
  const authId = Cookies.get("authId")!;
  const isAdmin = Cookies.get("isAdmin")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  return (
    <>
      <ScrollTop />
      <Routes>
        {MainRoute.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {/* adminhome配下のルーティング */}
        {AdminRouter.map((route, index) => (
          <Route
            key={index}
            // path={`/${route.path}`}
            path={`/${route.path}`}
            element={
              authId ? (
                loginUser && isAdmin ? (
                  <DefaultLayout>{route.element}</DefaultLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
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
        {/* {その他ルーティング} */}
        <Route
          path={`/adminhome`}
          element={
            authId && isAdmin ? <AdminHome /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path={`/home`}
          element={authId ? <Top /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
};
