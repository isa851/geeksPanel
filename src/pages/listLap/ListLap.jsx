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
                </div>
            </div>

            <table className="control__table">
                <thead className="control__head">
                    <tr className="control__row control__row--head">
                        <th className="control__cells">Имя ноутбука</th>
                        <th className="control__cells">ID</th>
                        <th className="control__cells">Device ID</th>
                        <th className="control__cells">Права</th>
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
                            </tr>
                        ))
                    ) : (
                        <tr className="control__row-empty">
                            <td colSpan="4">
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