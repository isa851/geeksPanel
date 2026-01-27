import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bakLap from "../../shared/imgs/desktopcomputer-amico1.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "./addLap.scss";

export default function AddLap({ onAdd }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const [name, setName] = useState("");
    const [idValue, setIdValue] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [rights, setRights] = useState("Учебный");

    const notify = () => toast("Вы успешно добавили новый ноутбук", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const nameRegex = /^WIN-DESC\d+$/; 
        const idRegex = /^\d+$/;       
        const deviceRegex = /^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+$/; 

        if (!nameRegex.test(name)) {
            alert("Имя должно быть в формате WIN-DESC133341");
            return;
        }
        if (!idRegex.test(idValue)) {
            alert("ID должен состоять из 3 цифр (например, 001)");
            return;
        }
        if (!deviceRegex.test(deviceId)) {
            alert("Device ID должен соответствовать формату (например, 348I-WCE4-SD-4V)");
            return;
        }

        notify(); 
        
        onAdd({
            name: name,
            number: idValue,
            DeviceID: deviceId,
            rights: rights
        });

        setTimeout(() => {
            navigate("/listLap");
        }, 2000);
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
            <ToastContainer />
        </div>
    );
}