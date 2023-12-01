import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './mainCss/navbar.css';
import './mainCss/login.css';
import Login from "./pages/member/Login";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import LectureList from "./pages/lecture/LectureList";
import InProgress from "./pages/course/InProgress";

function App() {

  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/login" element={<Login/>}/>
                      <Route path="/" element={<Layout/>}>
                          <Route index element={<Main/>}/>
                          {/*<Route path="mypage" element={<MyPageLayout/>}>*/}
                          {/*<Route path="profile" element={<Profile/>}/>*/}
                          {/*</Route>*/}
                          <Route path="lecture" element={<LectureList/>}/>
                      </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
