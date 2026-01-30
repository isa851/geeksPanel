import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "./home.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [isSystemOn] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  const statsData = {
    total: 40,
    online: 23,
    offline: 17,
    server: isSystemOn ? "On" : "Off",
    updates: "Новый",
    oldOS: 2,
  };

  useEffect(() => {
    const key = "timerTargetDate";
    let target = localStorage.getItem(key);

    if (!target) {
      target = Date.now() + (29 * 24 * 3600 + 23 * 3600 + 59 * 60 + 59) * 1000;
      localStorage.setItem(key, target);
    }

    const interval = setInterval(() => {
      const diff = target - Date.now();
      setTimeLeft(diff > 0 ? Math.floor(diff / 1000) : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("courier", "bold");
    doc.setFontSize(20);
    doc.text("OTCHET PO SISTEME", 10, 20);
    doc.setFont("courier", "normal");
    doc.setFontSize(14);

    const lines = [
      "-----------------------------------",
      "OBSHCHAYA STATISTIKA",
      `Vsego noutbukov: ${statsData.total}`,
      `Onlajn sejchas: ${statsData.online}`,
      `Offlajn: ${statsData.offline}`,
      "-----------------------------------",
      "SOSTOYANIE SISTEMY",
      `Server: ${statsData.server}`,
      `Obnovleniya: ${statsData.updates}`,
      `Ustarevshaya OS: ${statsData.oldOS}`,
      "-----------------------------------",
      `Data: ${new Date().toLocaleString()}`
    ];

    let y = 40;
    lines.forEach(l => {
      doc.text(l, 10, y);
      y += 10;
    });

    doc.save("system_stats.pdf");
  };

  const formatTime = s => {
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const p = n => String(n).padStart(2, "0");
    return `${d} дн : ${p(h)} ч : ${p(m)} м : ${p(sec)} с`;
  };

  const chartData = {
    labels: ["Figma", "Miro", "VS-Code", "Android Studio"],
    datasets: [{
      data: [25, 20, 30, 25],
      backgroundColor: ["#D65C5C", "#A5B452", "#5285B4", "#4CAF50"],
      borderWidth: 0,
      cutout: "75%"
    }]
  };

  return (
    <div className="home container">
      <div className="home__layout">
        <div className="home__column">
          <section className="stats">
            <h2 className="stats__title">Общая статистика</h2>
            <div className="stats__card">
              <div className="stats__row"><span>Всего ноутбуков:</span><b>{statsData.total}</b></div>
              <div className="stats__row"><span>Онлайн сейчас:</span><b>{statsData.online}</b></div>
              <div className="stats__row"><span>Оффлайн:</span><b>{statsData.offline}</b></div>
            </div>
          </section>

          <section className="stats">
            <h2 className="stats__title">Состояние системы</h2>
            <div className="stats__card">
              <div className="stats__row"><span>Сервер:</span><b>{statsData.server}</b></div>
              <div className="stats__row"><span>Обновления:</span><b>{statsData.updates}</b></div>
              <div className="stats__row"><span>Устаревшая ОС:</span><b>{statsData.oldOS}</b></div>
            </div>
          </section>

          <button className="home__export-btn" onClick={handleExportPDF}>
            Экспорт данных
          </button>
        </div>

        <div className="home__center">
          <h2 className="stats__title">Does not exist</h2>
          <div className="home__placeholder-card">Does not exist</div>
        </div>

        <div className="home__column">
          <section>
            <h2 className="stats__title">До очистки ноутов</h2>
            <div className="timer-display">{formatTime(timeLeft)}</div>
          </section>

          <section>
            <h2 className="stats__title">Активность</h2>
            <div className="activity-card">
              <div className="chart-container">
                <Doughnut data={chartData} options={{ plugins:{ legend:{ display:false } }, maintainAspectRatio:false }} />
              </div>
              <div className="chart-legend">
                <div className="legend-item"><i className="dot figma"></i>Figma</div>
                <div className="legend-item"><i className="dot miro"></i>Miro</div>
                <div className="legend-item"><i className="dot vscode"></i>VS-Code</div>
                <div className="legend-item"><i className="dot android"></i>Android Studio</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <h2 className="stats__title">Быстрое действие в системе ⏻</h2>

      <div className="home__actions">
        <div className="actions-grid">
          <Link to="/users" className="action-btn">
            Пользователи
          </Link>
          <Link to="/notification" className="action-btn">
            Уведомление
          </Link>
        </div>
      </div>
    </div>
  );
}
