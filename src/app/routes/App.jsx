import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../../pages/login/Login";
import Control from "../../pages/control/Control";
import Header from "../../widgets/header/Header";
import Access from "../../pages/access/Access";
import Blocking from "../../pages/blocking/Blocking";
import AddLap from "../../pages/addLap/AddLap";
import "../styles/app.scss";
import NotFound from "../../pages/notFound/NotFound";

const App = () => {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  useEffect(() => {
    const handleStorage = () => {
      setIsAuth(localStorage.getItem("isAuth") === "true");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <BrowserRouter>
      {isAuth && <Header />}

      <Routes>
        <Route
          path="*"
          element={<NotFound />}
        />
        <Route
          path="/add"
          element={
            isAuth ? <AddLap /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/access"
          element={
            isAuth ? <Access /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/blocking"
          element={
            isAuth ? <Blocking /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={
            isAuth ? <Control /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            isAuth ? <Navigate to="/" replace /> : <Login setIsAuth={setIsAuth} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
