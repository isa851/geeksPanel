import bakLap from "../../shared/imgs/desktopcomputer-amico1.png"
import "./addLap.scss";
import { Snowfall } from 'react-snowfall';

export default function AddLap() {
    return (
        <div className="container">
            <Snowfall color="#ffffff" />
            <div className="addLap">
                <div className="addLap_forms">
                    <form className="addLap_forms_form">
                        <div className="addLap_forms_form_inputs">
                        <input className="addLap_forms_form_inputs_input" type="text" placeholder="Имя ноута"/>
                        <input className="addLap_forms_form_inputs_input" type="text" placeholder="ID"/>
                        <input className="addLap_forms_form_inputs_input" type="text" placeholder="UUID"/>
                        <input className="addLap_forms_form_inputs_input" type="text" placeholder="Права"/>
                        </div>
                        <button className="addLap_forms_form_button">Добавить новый ноутбук</button>
                    </form>
                </div>
                <div className="addLap_bak">
                    <img className="addLap_bak_img" src={bakLap} alt="" />
                </div>
            </div>
        </div>
    );
}