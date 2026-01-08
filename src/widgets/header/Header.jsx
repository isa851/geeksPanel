import { NavLink } from "react-router-dom";
import headerLogo from "../../shared/imgs/headerLogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./header.scss";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuth");
        
        navigate("/login", { replace: true });

        window.location.reload(); 
    };
    return (
        <header className="headers">
            <div className="container">
                <div className="headers_header">
                    <div className="headers_header_logo">
                        <Link to="/">
                            <img
                                className="headers_header_logo_img"
                                src={headerLogo}
                                alt="headerLogo"
                            />
                        </Link>
                    </div>
                    <div className="headers_header_navs">
                        <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "headers_header_navs_link active"
                                : "headers_header_navs_link"
                        }
                        >
                            Главная
                        </NavLink>
                        <NavLink
                            to="/control"
                            className={({ isActive }) =>
                                isActive
                                    ? "headers_header_navs_link active"
                                    : "headers_header_navs_link"
                            }
                        >
                            Управление
                        </NavLink>

                        <NavLink
                            to="/access"
                            className={({ isActive }) =>
                                isActive
                                    ? "headers_header_navs_link active"
                                    : "headers_header_navs_link"
                            }
                        >
                            Доступ к сайтам
                        </NavLink>

                        <NavLink
                            to="/listLap"
                            className={({ isActive }) =>
                                isActive
                                    ? "headers_header_navs_link active"
                                    : "headers_header_navs_link"
                            }
                        >
                            Список ноутов
                        </NavLink>

                        <NavLink
                            to="/add"
                            className={({ isActive }) =>
                                isActive
                                    ? "headers_header_navs_link active"
                                    : "headers_header_navs_link"
                            }
                        >
                            Добавить ноутбук
                        </NavLink>
                    </div>
                    <div className="headers_header_exit">
                        <button onClick={handleLogout} className="headers_header_exit_btn">Выйти</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
