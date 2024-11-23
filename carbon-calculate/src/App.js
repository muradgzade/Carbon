import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { router } from "./router";

const App = () => {
  const location = useLocation();
  
  // Layout kullanılmayacak yollar
  const noLayoutPaths = ["/login", "/register"];

  const isNoLayout = noLayoutPaths.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        <Routes>
          {router &&
            router.map((path) => (
              <Route
                key={`path ${path.path}`}
                index
                element={path.component}
                path={path.path}
              />
            ))}
        </Routes>
      ) : (
        <Layout>
          <Routes>
            {router &&
              router.map((path) => (
                <Route
                  key={`path ${path.path}`}
                  index
                  element={path.component}
                  path={path.path}
                />
              ))}
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
