import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/Main";
import './main.css';

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route element={<Layout/>}>
                      <Route index element={<Main/>}/>
                  </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
