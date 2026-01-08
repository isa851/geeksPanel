import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../../pages/login/Login";
import Control from "../../pages/control/Control";
import Header from "../../widgets/header/Header";
import Access from "../../pages/access/Access";
import ListLap from "../../pages/listLap/ListLap";
import AddLap from "../../pages/addLap/AddLap";
import NotFound from "../../pages/notFound/NotFound";
import Home from "../../pages/home/Home";
import "../styles/app.scss";

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
          path="/login"
          element={
            isAuth ? <Navigate to="/" replace /> : <Login setIsAuth={setIsAuth} />
          }
        />

        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/add"
          element={isAuth ? <AddLap /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/access"
          element={isAuth ? <Access /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/listLap"
          element={isAuth ? <ListLap /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/control"
          element={isAuth ? <Control /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;