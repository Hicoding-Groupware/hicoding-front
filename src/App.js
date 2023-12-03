import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './main.css';
import './Student.css';
import Login from "./pages/member/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import LectureList from "./pages/lecture/LectureList";
import Student from "./pages/student/Student";
import StudentRegist from "./pages/student/StudentRegist";


function App() {

  return (
      <>
          <BrowserRouter>
              <Routes>
                  {/*<Route path="/" element={<Login/>}/>*/}
                      <Route path="/" element={<Layout/>}>
                          <Route index element={<Main/>}/>
                          <Route
                              path="students"
                              element={
                                <Student/>
                              }
                          />
                          <Route
                              path="studentRegist"
                              element={
                                <StudentRegist/>
                              }
                          />
                      </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
