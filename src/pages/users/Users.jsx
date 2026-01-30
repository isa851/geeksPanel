import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./users.scss"; 

const rolePasswords = {
    'root': '1234',
    'Куратор': '432',
    'Stuff': '432'
};

export default function Users() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem('usersData');
        if (savedData) {
            setData(JSON.parse(savedData));
        } else {
            const initial = [
                { id: 1, username: 'root', role: 'root', password: '1234' },
                { id: 2, username: 'Куратор', role: 'Куратор', password: '432' },
                { id: 3, username: 'Stuff', role: 'Stuff', password: '432' }
            ];
            setData(initial);
            localStorage.setItem('usersData', JSON.stringify(initial));
        }
    }, []);

    const handleChangeRole = (id, newRole) => {
        const updated = data.map(item =>
            item.id === id 
                ? { ...item, role: newRole, password: rolePasswords[newRole] || item.password } 
                : item
        );
        setData(updated);
        localStorage.setItem('usersData', JSON.stringify(updated));
    };

    const handleDelete = (id) => {
        if (window.confirm("Удалить этого пользователя?")) {
            const updated = data.filter(item => item.id !== id);
            setData(updated);
            localStorage.setItem('usersData', JSON.stringify(updated));
        }
    };

    return (
        <div className="container">
            <div className="header-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Link to="/addUser">
                    <button className="add-site-btn">Добавить пользователя</button>
                </Link>
            </div>

            <table className="control__table">
                <thead className="control__head">
                    <tr className="control__row">
                        <th className="control__cells">Пользователь</th>
                        <th className="control__cells">Права</th>
                        <th className="control__cells">Пароль</th>
                        <th className="control__cells"></th>
                    </tr>
                </thead>
                <tbody className="control__body">
                    {data.map(user => (
                        <tr className="control__row" key={user.id}>
                            <td className="control__cell">{user.username}</td>
                            <td className="control__cell">
                                <Dropdown 
                                    value={user.role} 
                                    onSelect={(newRole) => handleChangeRole(user.id, newRole)} 
                                />
                            </td>
                            <td className="control__cell">{user.password}</td>
                            <td className="control__cell" style={{ textAlign: 'right' }}>
                                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
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

function Dropdown({ value, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const options = ["root", "Куратор", "Stuff"];

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown" style={{ position: 'relative' }}>
            <div 
                className={`dropdown__header ${isOpen ? 'dropdown__header--open' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer' }}
            >
                {value}
                <span className={`dropdown__arrow ${isOpen ? 'dropdown__arrow--up' : ''}`}></span>
            </div>
            {isOpen && (
                <div className="dropdown__list" style={{ position: 'absolute', zIndex: 10, background: '#35373f', width: '100%', border: '1px solid #444' }}>
                    {options.map(option => (
                        <div
                            key={option}
                            className={`dropdown__item ${option === value ? 'dropdown__item--selected' : ''}`}
                            onClick={() => handleSelect(option)}
                            style={{ cursor: 'pointer', padding: '10px', color: '#fff' }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}