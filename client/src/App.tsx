import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainDrawer from "./layouts/MainDrawer";
import Home from "./pages/Home";
import PrivateRoute from "./routing/PrivateRoute";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLogoutHandler } from "./utils/axiosInstance";
import { authCheck, logout } from "./store/reducers/user";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import GlobalLoader from "./components/ui/Loader";
import { AppDispatch } from "./store/store";
import RecruitmentDrive from "./pages/RecruitmentDrive";
import QuestionHub from "./pages/QuestionHub";
import CodingQuestionForm from "./pages/CodingQuestionForm";
import ViewCodingQuestion from "./components/CodingQuestion/ViewCodingQuestion";
import CodeRunner from "./components/CodingQuestion/CodeRunner";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Register logout handler dynamically
    setLogoutHandler(() => {
      dispatch(logout());
      // window.location.href = "/login"; // Redirect to login page
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainDrawer />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/recruiter/recruitment-drive"
                element={<RecruitmentDrive />}
              />
              <Route
                path="/recruiter/question-hub"
                element={<QuestionHub />}
              />
              <Route
                path="/recruiter/question-hub/coding-question/create"
                element={<CodingQuestionForm />}
              />
              <Route
                path="/recruiter/question-hub/coding-question/edit/:id"
                element={<CodingQuestionForm />}
              />
              <Route
                path="/recruiter/question-hub/coding-question/:id/code-runner"
                element={<CodeRunner />}
              />
              <Route
                path="/recruiter/question-hub/coding-question/:id"
                element={<ViewCodingQuestion />}
              />
            </Route>
          </Route>
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route />
        </Routes>
      </Router>
      <ToastContainer />
      <GlobalLoader />
    </>
  );
}

export default App;
