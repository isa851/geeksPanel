import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../../pages/login/Login";
import Header from "../../widgets/header/Header";
import ListLap from "../../pages/listLap/ListLap";
import AddLap from "../../pages/addLap/AddLap";
import Home from "../../pages/home/Home";
import NotFound from "../../pages/notFound/NotFound";
import Access from "../../pages/access/Access";
import Control from "../../pages/control/Control";
import { Snowfall } from "react-snowfall";
import AddSite from "../../pages/addSite/AddSite";
import Demonstration from "../../pages/demonstration/Demonstration";
import "../styles/app.scss";

const defaultLaptops = [
    { id: 1, name: "WIN-DESC133341", number: "001", DeviceID: "348I-WCE4-SD-4V", rights: "Учебный" },
    { id: 2, name: "WIN-DESC166511", number: "002", DeviceID: "348I-WCE4-SD-4V", rights: "Root" },
];

const defaultSites = [
    { id: 1, name: "Figma", domain: "www.figma.com", downloads: "Разрешён", status: "Разрешён", available: "Да" },
    { id: 2, name: "Habr", domain: "www.habr.com", downloads: "Разрешён", status: "Разрешён", available: "Да" },
];

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
  
  // Состояние для ноутбуков
  const [laptops, setLaptops] = useState(() => {
    const saved = localStorage.getItem("laptops_list");
    return saved ? JSON.parse(saved) : defaultLaptops;
  });

  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem("sites_list");
    return saved ? JSON.parse(saved) : defaultSites;
  });

  useEffect(() => {
    localStorage.setItem("laptops_list", JSON.stringify(laptops));
  }, [laptops]);

  useEffect(() => {
    localStorage.setItem("sites_list", JSON.stringify(sites));
  }, [sites]);

  const handleAddLaptop = (newLap) => {
    setLaptops((prev) => [...prev, { ...newLap, id: Date.now() }]);
  };

  const handleAddSite = (newSite) => {
    setSites((prev) => [...prev, { ...newSite, id: Date.now() }]);
  };

  useEffect(() => {
    const handleStorage = () => setIsAuth(localStorage.getItem("isAuth") === "true");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <BrowserRouter> 
      {isAuth && <Header />}
      <Snowfall color="#ffffff" />

      <Routes>
        <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <Login setIsAuth={setIsAuth} />} />
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" replace />} />
        
        <Route path="/demonstration" element={isAuth ? <Demonstration /> : <Navigate to="/login" replace />} />
        <Route path="/addSite" element={isAuth ? <AddSite onAdd={handleAddSite} /> : <Navigate to="/login" replace />} />
        <Route path="/access" element={isAuth ? <Access data={sites} setData={setSites} /> : <Navigate to="/login" replace />} />
        
        <Route path="/control" element={isAuth ? <Control /> : <Navigate to="/login" replace />} />
        <Route path="/add" element={isAuth ? <AddLap onAdd={handleAddLaptop} /> : <Navigate to="/login" replace />} />
        <Route path="/listLap" element={isAuth ? <ListLap data={laptops} setData={setLaptops} /> : <Navigate to="/login" replace />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;