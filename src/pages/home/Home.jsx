import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./home.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [isSystemOn, setIsSystemOn] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const STORAGE_KEY = "timerTargetDate";
    let targetDate = localStorage.getItem(STORAGE_KEY);

    if (!targetDate) {
      const duration = (29 * 24 * 3600) + (23 * 3600) + (59 * 60) + 59;
      targetDate = Date.now() + duration * 1000;
      localStorage.setItem(STORAGE_KEY, targetDate);
    }

    const updateTimer = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) return setTimeLeft(0);
      setTimeLeft(Math.floor(diff / 1000));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => {
    const d = Math.floor(s / (3600 * 24));
    const h = Math.floor((s % (3600 * 24)) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const p = (n) => String(n).padStart(2, "0");
    return `${d} дн : ${p(h)} ч : ${p(m)} м : ${p(sec)} с`;
  };

  const chartData = {
    labels: ["Figma", "Miro", "VS-Code", "Android Studio"],
    datasets: [{
      data: [25, 20, 30, 25],
      backgroundColor: ["#D65C5C", "#A5B452", "#5285B4", "#4CAF50"],
      borderWidth: 0,
      cutout: "75%",
    }],
  };

  return (
    <div className="home container">
      <div className="home__layout">
        <div className="home__column">
          <section className="stats">
            <h2 className="stats__title">Общая статистика</h2>
            <div className="stats__card">
              <div className="stats__row"><span>Всего ноутбуков:</span><b>40</b></div>
              <div className="stats__row"><span>Онлайн сейчас:</span><b>23</b></div>
              <div className="stats__row"><span>Оффлайн:</span><b>17</b></div>
            </div>
          </section>

          <section className="stats">
            <h2 className="stats__title">Состояние системы</h2>
            <div className="stats__card">
              <div className="stats__row"><span>Сервер:</span><b>{isSystemOn ? "On" : "Off"}</b></div>
              <div className="stats__row"><span>Обновления:</span><b>Новый</b></div>
              <div className="stats__row"><span>Ноутбуки с устаревшей ОС:</span><b>2</b></div>
            </div>
          </section>
          <button className="home__export-btn">Экспорт данных</button>
        </div>

        <div className="home__center">
          <h2 className="stats__title">Does not exist</h2>
          <div className="home__placeholder-card">Does not exist</div>
        </div>

        <div className="home__column">
          <section className="timer-section">
            <h2 className="stats__title">До очистки ноутов</h2>
            <div className="timer-display">{formatTime(timeLeft)}</div>
          </section>

          <section className="activity-section">
            <h2 className="stats__title">Активность</h2>
            <div className="activity-card">
              <div className="chart-container">
                <Doughnut data={chartData} options={{plugins:{legend:{display:false}}, maintainAspectRatio:false}} />
              </div>
              <div className="chart-legend">
                <div className="legend-item"><i className="dot figma"></i> Figma</div>
                <div className="legend-item"><i className="dot miro"></i> Miro</div>
                <div className="legend-item"><i className="dot vscode"></i> VS-Code</div>
                <div className="legend-item"><i className="dot android"></i> Android Studio</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="home__actions">
        <h2 className="stats__title">Быстрое действие в системе ⏻</h2>
        <div className="actions-grid">
          <button 
            className={`btn ${!isSystemOn ? 'btn--yellow' : 'btn--disabled'}`}
            disabled={isSystemOn}
            onClick={() => setIsSystemOn(true)}
          >Включить</button>
          <button className="btn btn--yellow">Рестарт</button>
          <button 
            className={`btn ${isSystemOn ? 'btn--red' : 'btn--disabled'}`}
            disabled={!isSystemOn}
            onClick={() => setIsSystemOn(false)}
          >Отключить</button>
          <button className="btn btn--yellow">Уведомление</button>
        </div>
      </div>
    </div>
  );
}