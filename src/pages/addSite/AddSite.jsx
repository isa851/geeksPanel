import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgSite from "../../shared/imgs/addSite.png";
import "./addSite.scss";

export default function AddSite({ onAdd }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedValue, setSelectedValue] = useState("Разрешён");

  const options = ["Разрешён", "Запрещён"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !domain) return alert("Заполните все поля");

    const newSite = {
      name,
      domain,
      downloads: selectedValue,
      status: "Разрешён", 
      available: "Да"   
    };

    onAdd(newSite);
    navigate("/"); 
  };

  return (
    <div className="add-site-container container">
      <div className="add-site-card">
        <form className="add-site-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Имя сайта" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input 
              type="text" 
              placeholder="Домен" 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Скачивание файлов</label>
            <div className={`custom-select ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
              <div className="select-trigger">
                <span>{selectedValue}</span>
                <div className="arrow-icon"></div>
              </div>
              
              {isOpen && (
                <div className="select-options">
                  {options.map((option) => (
                    <div 
                      key={option} 
                      className="option-item"
                      onClick={() => {
                        setSelectedValue(option);
                        setIsOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Добавить новый сайт
          </button>
        </form>
      </div>

      <div className="add-site-image">
        <img src={imgSite} alt="Illustration" />
      </div>
    </div>
  );
}