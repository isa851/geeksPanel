import notificationImg from "../../shared/imgs/notification.png"; // Убедитесь, что расширение верное
import "./notification.scss";

export default function Notification() {
    return (
        <div className="notification-page container">
            <div className="notification-container">
                <form className="notification-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <input type="text" placeholder="Текст уведомления" />
                    </div>

                    <div className="input-group">
                        <input type="text" placeholder="Ноутбук" />
                        <label className="checkbox-container">
                            <input className="chec" type="checkbox" />
                            <span className="checkmark"></span>
                            Выбрать все ноутбуки
                        </label>
                    </div>

                    <div className="input-group">
                        <input type="text" placeholder="Имя отправителя" />
                        <span className="hint">*Не обязательно</span>
                    </div>

                    <button type="submit" className="submit-btn">
                        Отправить уведомление
                    </button>
                </form>

                <div className="notification-illustration">
                    <img src={notificationImg} alt="Illustration" />
                </div>
            </div>
        </div>
    );
}