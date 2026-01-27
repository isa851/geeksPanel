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
  const [errors, setErrors] = useState({});

  const options = ["Разрешён", "Запрещён"];

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Введите название сайта";
    } else if (name.length < 2) {
      newErrors.name = "Название должно быть не короче 2 символов";
    }

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
    if (!domain.trim()) {
      newErrors.domain = "Введите адрес сайта или домен";
    } else if (!urlPattern.test(domain)) {
      newErrors.domain = "Неверный формат ссылки (нужна точка, без пробелов)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      const newSite = {
        id: Date.now(), 
        name: name.trim(),
        domain: domain.trim(),
        downloads: selectedValue,
        status: selectedValue,
        available: selectedValue === "Разрешён" ? "Да" : "Нет" 
      };

      onAdd(newSite);
      navigate("/"); 
    }
  };

  return (
    <div className="add-site-container container">
      <div className="add-site-card">
        <form className="add-site-form" onSubmit={handleSubmit} noValidate>
          <div className={`input-group ${errors.name ? "error" : ""}`}>
            <input 
              type="text" 
              placeholder="Имя сайта" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: null }));
              }}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className={`input-group ${errors.domain ? "error" : ""}`}>
            <input 
              type="text" 
              placeholder="Домен или URL" 
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                if (errors.domain) setErrors(prev => ({ ...prev, domain: null }));
              }}
            />
            {errors.domain && <span className="error-text">{errors.domain}</span>}
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
                      onClick={(e) => {
                        e.stopPropagation();
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