import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import addUserImg from "../../shared/imgs/addUser.png";
import 'react-toastify/dist/ReactToastify.css'; 
import "./addUser.scss";

export default function AddUser() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Куратор");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!username || !password) return;

        const newUser = {
            id: Date.now(),
            username,
            role,
            password
        };

        const existingUsers = JSON.parse(localStorage.getItem('usersData')) || [
            { id: 1, username: 'root', role: 'root', password: '1234' },
            { id: 2, username: 'Куратор', role: 'Куратор', password: '432' },
            { id: 3, username: 'Stuff', role: 'Stuff', password: '432' }
        ];

        localStorage.setItem('usersData', JSON.stringify([...existingUsers, newUser]));

        toast.success("Пользователь добавлен", {
            position: "top-right",
            autoClose: 1500,
            theme: "dark"
        });

        setTimeout(() => navigate("/users"), 1500);
    };

    return (
        <div className="container">
            <div className="addLap">
                <div className="addLap_forms">
                    <form className="addLap_forms_form" onSubmit={handleSubmit}>
                        <div className="addLap_forms_form_inputs">
                            <input 
                                className="addLap_forms_form_inputs_input" 
                                type="text" 
                                placeholder="Имя пользователя" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input 
                                className="addLap_forms_form_inputs_input" 
                                type="password" 
                                placeholder="Пароль пользователя" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className={`custom_select ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                                <div className="selected_value">
                                    {role}
                                    <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
                                </div>
                                {isOpen && (
                                    <ul className="select_options">
                                        <li onClick={() => setRole("Куратор")}>Куратор</li>
                                        <li onClick={() => setRole("root")}>root</li>
                                        <li onClick={() => setRole("Stuff")}>Stuff</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="addLap_forms_form_button">Добавить нового пользователя</button>
                    </form>
                </div>
                <div className="adduser_bak">
                    <img className="adduser_bac_img" src={addUserImg} alt="иллюстрация" />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}