import { Link } from "react-router-dom";
import "./control.scss";

const rawData = [
    { id: 1, name: "WIN-DESC133341", num: "001", state: "Выключено", battery: "100%", time: "Не известно", rights: "Учебный", observe: "Не доступно" },
    { id: 2, name: "WIN-DESC133341", num: "002", state: "Включено", battery: "45%", time: "00:01:32", rights: "Учебный", observe: "Доступно" },
    { id: 3, name: "WIN-DESC133341", num: "003", state: "Включено", battery: "80%", time: "01:10:05", rights: "Stuff", observe: "доступно" },  
    { id: 4, name: "WIN-DESC133341", num: "004", state: "Включено", battery: "92%", time: "00:01:32", rights: "Stuff", observe: "доступно" },
    { id: 5, name: "WIN-DESC133341", num: "005", state: "Включено", battery: "10%", time: "00:05:00", rights: "Учебный", observe: "не доступно" },
    { id: 6, name: "WIN-DESC133341", num: "006", state: "В питании", battery: "92%", time: "00:01:32", rights: "Учебный", observe: "Доступно" },
    { id: 7, name: "WIN-DESC133341", num: "007", state: "Выключено", battery: "Не известно", time: "Не известно", rights: "Учебный", observe: "НЕ ДОСТУПНО" }
];

const data = rawData.map((item) => {
  const checkStatus = item.observe.trim().toLowerCase();

  if (checkStatus === "не доступно") {
    return {
      ...item,
      state: "Выключено",
      battery: "Не известно",
      time: "Не известно",
      observe: "Не доступно",
    };
  }

  return {
    ...item,
    observe: "Доступно",
  };
});

export function Control() {
  return (
    <div className="container">
      <table className="control__table">
        <thead className="control__head">
          <tr className="control__row control__row--head">
            <th className="control__cells">Имя ноутбука</th>
            <th className="control__cells">ID</th>
            <th className="control__cells">Состояние</th>
            <th className="control__cells">Заряд батареи</th>
            <th className="control__cells">Время активности</th>
            <th className="control__cells">Права</th>
            <th className="control__cells">Наблюдать</th>
          </tr>
        </thead>
        <tbody className="control__body">
          {data.map((item) => (
            <tr className="control__row" key={item.id}>
              <td className="control__cell">{item.name}</td>
              <td className="control__cell">{item.num}</td>
              <td className="control__cell">{item.state}</td>
              <td className="control__cell">{item.battery}</td>
              <td className="control__cell">{item.time}</td>
              <td className="control__cell">{item.rights}</td>
              <td className="control__cell">
                {item.observe === "Доступно" ? (
                  <Link 
                    to="/demonstration" 
                    className="control__btn control__btn--active"
                  >
                    {item.observe}
                  </Link>
                ) : (
                  <span className="control__btn control__btn--disabled">
                    {item.observe}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Control;