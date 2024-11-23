import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { router } from "./router";





const App = () => {
  
  return (
    <>
     

       <Layout>
       <Routes>
          {
            router&&router.map((path)=>(
            <Route key={`path ${path.path}`} index element={path.component} path={path.path} />
            ))
          }

        </Routes>
       </Layout>

      

    </>

 
  );
};

export default App;
