import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import "./listLap.scss";

export default function ListLap({ data, setData }) {
    const [openId, setOpenId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDropdown = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const handleSelect = (id, newRights) => {
        setData(data.map(item => item.id === id ? { ...item, rights: newRights } : item));
        setOpenId(null);
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="control-page container">
            <div className="stars-overlay"></div>

            <div className="control__header-actions">
              <div className="control__search-container">
                    <input 
                        type="text" 
                        className="control__search-input" 
                        placeholder="Поиск ноутбука" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch className="control__search-icon" />
                </div>
            </div>

            <table className="control__table">
                <thead className="control__head">
                    <tr className="control__row">
                        <th className="control__cells">Имя ноутбука</th>
                        <th className="control__cells">ID</th>
                        <th className="control__cells">Device ID</th>
                        <th className="control__cells">Права</th>
                        <th className="control__cells"></th> {/* Пустая ячейка для иконки удаления */}
                    </tr>
                </thead>
                <tbody className="control__body">
                    {filteredData.length > 0 ? (
                        filteredData.map(item => (
                            <tr className="control__row" key={item.id}>
                                <td className="control__cell">{item.name}</td>
                                <td className="control__cell">{item.number}</td>
                                <td className="control__cell">{item.DeviceID}</td>
                                <td className="control__cell">
                                    <div className="dropdown">
                                        <div 
                                            className={`dropdown__header ${openId === item.id ? 'dropdown__header--open' : ''}`}
                                            onClick={() => toggleDropdown(item.id)}
                                        >
                                            <span>{item.rights}</span>
                                            <span className="dropdown__arrow"></span>
                                        </div>
                                        
                                        {openId === item.id && (
                                            <div className="dropdown__list">
                                                <div className="dropdown__item" onClick={() => handleSelect(item.id, "Учебный")}>Учебный</div>
                                                <div className="dropdown__item" onClick={() => handleSelect(item.id, "Root")}>Root</div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="control__cell control__cell--action">
                                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                                            <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#E53935"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="control__row-empty">
                            <td colSpan="5"> 
                                <div className="no-results-content">
                                    <span className="no-results-icon"><FiSearch /></span>
                                    <p>По запросу "<b>{searchTerm}</b>" ничего не найдено</p>
                                    <button className="reset-btn" onClick={() => setSearchTerm("")}>Сбросить поиск</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}