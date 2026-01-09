import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bakLap from "../../shared/imgs/desktopcomputer-amico1.png";
import "./addLap.scss";

export default function AddLap({ onAdd }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const [name, setName] = useState("");
    const [idValue, setIdValue] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [rights, setRights] = useState("Учебный");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !idValue || !deviceId) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        onAdd({
            name: name,
            number: idValue,
            DeviceID: deviceId,
            rights: rights
        });

        navigate("/listLap");
    };

    return (
        <div className="container">
            <div className="addLap">
                <div className="addLap_forms">
                    <form className="addLap_forms_form" onSubmit={handleSubmit}>
                        <div className="addLap_forms_form_inputs">
                            <input 
                                className="addLap_forms_form_inputs_input" 
                                type="text" placeholder="Имя ноута" 
                                value={name} onChange={(e) => setName(e.target.value)}
                            />
                            <input 
                                className="addLap_forms_form_inputs_input" 
                                type="text" placeholder="ID" 
                                value={idValue} onChange={(e) => setIdValue(e.target.value)}
                            />
                            <input 
                                className="addLap_forms_form_inputs_input" 
                                type="text" placeholder="Device ID" 
                                value={deviceId} onChange={(e) => setDeviceId(e.target.value)}
                            />
                            
                            <div className={`custom_select ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                                <div className="selected_value">
                                    {rights}
                                    <span className="arrow"></span>
                                </div>
                                {isOpen && (
                                    <ul className="select_options">
                                        <li onClick={() => setRights("Учебный")}>Учебный</li>
                                        <li onClick={() => setRights("Root")}>Root</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="addLap_forms_form_button">Добавить новый ноутбук</button>
                    </form>
                </div>
                <div className="addLap_bak">
                    <img className="addLap_bak_img" src={bakLap} alt="иллюстрация" />
                </div>
            </div>
        </div>
    );
}