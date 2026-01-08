import "./home.scss";
import { Snowfall } from 'react-snowfall';

export default function Home() {
    return (
        <div className="container">
            <Snowfall color="#ffffff" />
            <h1>Home</h1>
        </div>
    );
}