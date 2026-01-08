import "./control.scss";
import { Snowfall } from 'react-snowfall';


const data = [
    {
        id: 1,
        name: "WIN-DESC133341",
        num: "001",
        state: "Не известно",
        battery: "100%",
        time: "Не известно",
        rights: "Учебный",
        observe: "Не доступно"
        
    },
    {
        id: 2,
        name: "WIN-DESC133341",
        num: "002",
        state: "Включено",
        battery: "45%",
        time: "Не известно",
        rights: "Учебный",
        observe: "Доступно"
        
    },
    {
        id: 3,
        name: "WIN-DESC133341",
        num: "003",
        state: "Включено",
        battery: "Не известно",
        time: "00:01:32",
        rights: "Stuff",
        observe: "Не доступно"
    },
    {
        id: 4,
        name: "WIN-DESC133341",
        num: "004",
        state: "Включено",
        battery: "92%",
        time: "00:01:32",
        rights: "Stuff",
        observe: "Доступно"
    },
    {
        id:5,
        name: "WIN-DESC133341",
        num: "005",
        state: "Включено",
        battery: "Не известно",
        time: "00:01:32",
        rights: "Учебный",
        observe: "Не доступно"
    },
    {
        id:6,
        name: "WIN-DESC133341",
        num: "006",
        state: "Включено",
        battery: "92%",
        time: "00:01:32",
        rights: "Учебный",
        observe: "Доступно"
    },
    {
        id: 7,
        name: "WIN-DESC133341",
        num: "007",
        state: "Включено",
        battery: "92%",
        time: "00:01:32",
        rights: "Учебный",
        observe: "Не доступно"
    }
]

export function Control() {
  return (
    <div className="container">
      <Snowfall color="#ffffff" />
      <table className="control__table">
        <thead className="control__head"  >
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
          {data.map(item => (
            <tr className="control__row" key={item.id}>
              <td className="control__cell">{item.name}</td>
              <td className="control__cell">{item.num}</td>
              <td className="control__cell">{item.state}</td>
              <td className="control__cell">{item.battery}</td>
              <td className="control__cell">{item.time}</td>
              <td className="control__cell">{item.rights}</td>
              <td className="control__cell">
                <span
                  className={
                    item.observe === "Доступно"
                      ? "control__btn control__btn--active"
                      : "control__btn control__btn--disabled"
                  }
                >
                  {item.observe}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Control
