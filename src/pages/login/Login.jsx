import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoLogin from "../../shared/imgs/logoLogin.png";
import "./login.scss";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (login === "1" && password === "1") {
      localStorage.setItem("isAuth", "true");

      navigate("/", { replace: true });

      window.location.reload();
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login_logo">
          <img src={logoLogin} alt="logoLogin" />
        </div>

        <div className="login_control">
          <div className="login_control_panel">
            <h1 className="login_control_panel_title">Geeks Panel</h1>
            <p className="login_control_panel_text">
              платформа для управление
            </p>
          </div>

          <div className="login_control_form">
            <h1 className="login_control_form_title">Войти в систему</h1>
            <p className="login_control_form_text">
              Введите логин и пароль
            </p>

            <div className="login_control_form_inputs">
              <input
                className="login_control_form_inputs_input"
                type="text"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />

              <input
                className="login_control_form_inputs_input"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {error}
              </p>
            )}

            <button onClick={handleLogin}>
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
