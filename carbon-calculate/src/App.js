import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { router } from "./router";
import PrivateRoute from "./PrivateRoute";  // PrivateRoute'ı import ettik

const App = () => {
  const location = useLocation();

  // Layout kullanılmayacak yollar
  const noLayoutPaths = ["/", "/register", "/login"];
  const isNoLayout = noLayoutPaths.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        <Routes>
          {router &&
            router.map((path) => {
              // PrivateRoute koruması eklemek için
              if (path.path === "/home") {
                return (
                  <Route
                    key={`path ${path.path}`}
                    path={path.path}
                    element={
                      <PrivateRoute>
                        {path.component}
                      </PrivateRoute>
                    }
                  />
                );
              }

              return (
                <Route
                  key={`path ${path.path}`}
                  path={path.path}
                  element={path.component}
                />
              );
            })}
        </Routes>
      ) : (
        <Layout>
          <Routes>
            {router &&
              router.map((path) => {
                if (path.path === "/home") {
                  return (
                    <Route
                      key={`path ${path.path}`}
                      path={path.path}
                      element={
                        <PrivateRoute>
                          {path.component}
                        </PrivateRoute>
                      }
                    />
                  );
                }

                return (
                  <Route
                    key={`path ${path.path}`}
                    path={path.path}
                    element={path.component}
                  />
                );
              })}
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
