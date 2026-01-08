import React, { useState } from 'react';
import "./access.scss";
import { Snowfall } from 'react-snowfall';

const initialData = [
    { id: 1, name: "Figma", domain: "www.figma.com", available: "Да" },
    { id: 2, name: "Habr", domain: "www.habr.com", available: "Да" },
    { id: 3, name: "VS-Code", domain: "www.visual-studio-code.com", available: "Да" },
    { id: 4, name: "CS-1.6", domain: "N/T", available: "Нет" },
    { id: 5, name: "CS-1.6", domain: "N/T", available: "Нет" },
    { id: 6, name: "CS-1.6", domain: "N/T", available: "Нет" },
    { id: 7, name: "CS-1.6", domain: "N/T", available: "Нет" },
    { id: 8, name: "CS-1.6", domain: "N/T", available: "Нет" },
];

export default function Access() {
    const [openId, setOpenId] = useState(null);
    const [data, setData] = useState(initialData);

    const toggleDropdown = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const handleSelect = (id, status) => {
        const newData = data.map(item => {
            if (item.id === id) {
                return { ...item, available: status === "Разрешён" ? "Да" : "Нет" };
            }
            return item;
        });
        setData(newData);
        setOpenId(null);
    };

    return (
        <div className="container">
            <Snowfall color="#ffffff" />
            <table className="control__table">
                <thead className="control__head">
                    <tr className="control__row control__row--head">
                        <th className="control__cells">Название</th>
                        <th className="control__cells">Домен</th>
                        <th className="control__cells">Статус</th>
                        <th className="control__cells">Доступно</th>
                    </tr>
                </thead>
                <tbody className="control__body">
                    {data.map(item => (
                        <tr className="control__row" key={item.id}>
                            <td className="control__cell">{item.name}</td>
                            <td className="control__cell">{item.domain}</td>
                            <td className="control__cell">
                                <div className="dropdown">
                                    <div 
                                        className={`dropdown__header ${openId === item.id ? 'dropdown__header--open' : ''}`}
                                        onClick={() => toggleDropdown(item.id)}
                                    >
                                        {item.available === "Да" ? "Разрешён" : "Запрещён"}
                                        <span className="dropdown__arrow"></span>
                                    </div>
                                    
                                    {openId === item.id && (
                                        <div className="dropdown__list">
                                            <div className="dropdown__item" onClick={() => handleSelect(item.id, "Разрешён")}>Разрешён</div>
                                            <div className="dropdown__item" onClick={() => handleSelect(item.id, "Запрещён")}>Запрещён</div>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="control__cell">{item.available}</td>              
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}