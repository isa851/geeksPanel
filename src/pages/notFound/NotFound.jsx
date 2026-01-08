import "./notFound.scss";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/");
    };
    return (
        <div className="container">
            <div className="notFound">
                <h1 className="notFound_number">404</h1>
                <p className="notFound_text">увы но этой страницы не существует</p>
                <button onClick={navigateToHome} className="notFound_btn">На главную</button>
            </div>
        </div>
    );
}