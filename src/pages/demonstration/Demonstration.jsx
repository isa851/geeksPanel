import { SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";
import "./demonstration.scss";

export default function Demonstration() {
  return (
    <div className="demonstration container">
      <div className="demonstration_content">
        <h1 className="demonstration_content_title">Видео не найдено</h1>
      </div>

      <div className="demonstration_footer">
        <Link to="/control" className="demonstration_btn">
          <SlArrowLeft className="icon" />
          Вернуться в управление
        </Link>
      </div>
    </div>
  );
}
