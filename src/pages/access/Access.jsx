import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./access.scss";

export default function Access({ data, setData }) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (id, field) => {
        setOpenDropdown(
            openDropdown?.id === id && openDropdown?.field === field
                ? null
                : { id, field }
        );
    };

    const handleSelect = (id, field, value) => {
        setData(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        [field]: value,
                        available: value === "Разрешён" ? "Да" : "Нет"
                    }
                    : item
            )
        );
        setOpenDropdown(null);
    };

    const handleDelete = (id) => {
        setData(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="container">
            <div className="header-actions">
                <Link to="/addSite">
                    <button className="add-site-btn">Добавить сайт</button>
                </Link>
            </div>

            <table className="control__table">
                <thead className="control__head">
                    <tr className="control__row">
                        <th className="control__cells">Название</th>
                        <th className="control__cells">Домен</th>
                        <th className="control__cells">Статус</th>
                        <th className="control__cells">Доступно</th>
                        <th className="control__cells"></th>
                    </tr>
                </thead>

                <tbody className="control__body">
                    {data.map(item => (
                        <tr className="control__row" key={item.id}>
                            <td className="control__cell">{item.name}</td>

                            <td className="control__cell">
                                <span
                                    className="domain-wrapper"
                                    title={item.domain}
                                >
                                    {item.domain}
                                </span>
                            </td>

                            <td className="control__cell">
                                <Dropdown
                                    value={item.status}
                                    isOpen={openDropdown?.id === item.id && openDropdown?.field === 'status'}
                                    toggle={() => toggleDropdown(item.id, 'status')}
                                    onSelect={(val) => handleSelect(item.id, 'status', val)}
                                />
                            </td>

                            <td className="control__cell">{item.available}</td>

                            <td className="control__cell">
                                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                                        <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#E53935"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Dropdown({ value, isOpen, toggle, onSelect }) {
    const options = ["Разрешён", "Запрещён"];

    return (
        <div className="dropdown">
            <div className={`dropdown__header ${isOpen ? 'dropdown__header--open' : ''}`} onClick={toggle}>
                {value}
                <span className={`dropdown__arrow ${isOpen ? 'dropdown__arrow--up' : ''}`}></span>
            </div>

            {isOpen && (
                <div className="dropdown__list">
                    {options.map(option => (
                        <div
                            key={option}
                            className={`dropdown__item ${option === value ? 'dropdown__item--selected' : ''}`}
                            onClick={() => onSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
