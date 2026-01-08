import "./home.scss";
import { Snowfall } from "react-snowfall";

export default function Home() {
  return (
    <div className="home container">
      <Snowfall color="#ffffff" snowflakeCount={150} />

      <div className="home__stats">
        <section className="stats">
          <h2 className="stats__title">Общая статистика:</h2>

          <div className="stats__card">
            <div className="stats__row">
              <span className="stats__label">Всего ноутбуков:</span>
              <span className="stats__value">40</span>
            </div>

            <div className="stats__row">
              <span className="stats__label">Онлайн сейчас:</span>
              <span className="stats__value">23</span>
            </div>

            <div className="stats__row">
              <span className="stats__label">Оффлайн:</span>
              <span className="stats__value">17</span>
            </div>
          </div>
        </section>

        <section className="stats">
          <h2 className="stats__title">Состояние системы</h2>

          <div className="stats__card">
            <div className="stats__row">
              <span className="stats__label">Сервер:</span>
              <span className="stats__value">On</span>
            </div>

            <div className="stats__row">
              <span className="stats__label">Обновления:</span>
              <span className="stats__value">Новый</span>
            </div>

            <div className="stats__row">
              <span className="stats__label">Ноутбуки с устаревшей ОС:</span>
              <span className="stats__value">2</span>
            </div>
          </div>
        </section>

        <button className="home__export-btn">
          Экспорт отчётов
        </button>
      </div>
    </div>
  );
}
